import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('hashtag', (t) => {
    t.string('id').primary();
    t.string('hashtag');
  });

  await knex.schema.createTable('hashtag_data', (t) => {
    t.string('id').primary();
    t.string('hashtag_id');
    t.integer('hour_start');
    t.integer('count');

    t.unique(['hashtag_id', 'hour_start']);

    t.foreign('hashtag_id').references('hashtag.id');
  });

  await knex.schema.createTable('user', (t) => {
    t.string('id').primary();
  });

  await knex.schema.createTable('subscription', (t) => {
    t.string('id').primary();
    t.string('user_id');
    t.string('hashtag_id');

    t.foreign('user_id').references('user.id');
    t.foreign('hashtag_id').references('hashtag.id');
  });

  await knex('user').insert({
    id: 'bh',
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('subscription');
  await knex.schema.dropTableIfExists('user');
  await knex.schema.dropTableIfExists('hashtag_data');
  await knex.schema.dropTableIfExists('hashtag');
}
