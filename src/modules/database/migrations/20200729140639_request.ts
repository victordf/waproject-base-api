import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Request', table => {
    table.increments('id').primary();
    table.string('description').notNullable();
    table.integer('amount').notNullable();
    table.decimal('value').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Request');
}
