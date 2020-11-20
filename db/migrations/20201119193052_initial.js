const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");

function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references("id")
    .inTable(tableName)
    .onDelete("CASCADE")
    .notNullable();
}

/**
 * @param {Knex} knex
 */
/**
 * Migrate DB
 */
exports.up = async (knex) => {

  await knex.schema.createTable(tableNames.state, (table) => {
    table.increments().notNullable();
    table.string("name", 30).notNullable();
  });

  await knex.schema.createTable(tableNames.company, (table) => {
    table.increments().notNullable();
    table.string("name", 60).notNullable();
    table.string("nif", 10).notNullable();
  });

  await knex.schema.createTable(tableNames.construction, (table) => {
    table.string("ref", 15).unique().notNullable();
    table.string("name", 60);
    table.string("description", 200);
    table.integer("quotation");
    references(table, tableNames.company);
    references(table, tableNames.state);
  });
};

/**
 * Rollback Changes
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(tableNames.construction);
  await knex.schema.dropTable(tableNames.state);
  await knex.schema.dropTable(tableNames.company);
};
