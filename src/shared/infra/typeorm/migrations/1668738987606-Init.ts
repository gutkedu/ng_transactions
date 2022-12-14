import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1668738987606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create extension if not exists "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop extension "uuid-ossp"');
  }
}
