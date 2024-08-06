import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTutorials1722858520285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tutorials',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'summary',
            type: 'varchar',
          },
          {
            name: 'estimated_duration',
            type: 'varchar',
          },
          {
            name: 'difficulty_level',
            type: 'enum',
            enum: ['beginner', 'intermediate', 'advanced'],
          },
          {
            name: 'creator_id',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'is_deleted',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tutorials',
      new TableForeignKey({
        columnNames: ['creator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tutorials');
  }
}
