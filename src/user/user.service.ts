import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcrypHashSync } from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = []

  create(newUser: UserDto){
    newUser.id = uuid();
    newUser.password = bcrypHashSync(newUser.password, 10);
    this.users.push(newUser);
  }

  findByUsername(username: string): UserDto | null {
    return this.users.find(user => user.username === username);
  }
}
