import * as Knex from "knex";

exports.up = function (knex: Knex) {
    return knex.schema.createTable('todos', (table) => {
        table.increments();
        table.string("title");
        table.string("description");
        table.string("status");
        table.timestamp('date');
    });
};

exports.down = function (knex: Knex) {
    return knex.schema.dropTableIfExists('todos');
};
