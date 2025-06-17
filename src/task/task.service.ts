import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './dto/task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {

  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    task.id = uuid();
    task.status = TaskStatusEnum.TO_DO;
    this.tasks.push(task);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find(task => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return foundTask[0];
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter(t => {
      let matches = true;

      if(params.title != undefined  && !t.title.includes(params.title)) {
        matches = false;
      }

      if(params.status != undefined  && !t.status.includes(params.status)) {
        matches = false;
      }

      return matches;
    })
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex(t => t.id === task.id);
    
    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new NotFoundException(`Task with ID ${task.id} not found`);
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex(t => t.id === id);
    
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new NotFoundException(`Task with ID ${id} not found`);
  }
}
