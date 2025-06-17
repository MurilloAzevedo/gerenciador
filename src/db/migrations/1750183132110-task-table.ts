import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1750183132110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.query(`
            CREATE TABLE "task" (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                title VARCHAR(256) NOT NULL,
                description varchar(512) NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'TO_DO',
                expiration_date timestamptz NOT NULL,
                CONTRAINT task_pk PRIMARY KEY (id)
            );
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS task;`);
    }

}
