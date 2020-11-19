const Knex = require("knex");
const tableNames = require("../../src/constants/tableNames");

// function createNameTable(knex, tableName) {
//   return knex.schema.createTable(tableName, (table) => {
//     table.increments().notNullable();
//     table.string('name', 150).notNullable();
//   });
// }

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
  await knex.schema.createTable(tableNames.company, (table) => {
    table.increments().notNullable();
    table.string("name", 60).notNullable();
    table.string("nif", 10);
  });

  // await knex.schema.createTable(tableNames.user, (table) => {
  //   table.increments().notNullable();
  //   table.string("name", 60).notNullable();
  //   table.string("password", 20);
  //   references(table, tableNames.user_role);
  // });

  // await knex.schema.createTable(tableNames.açao, (table) => {
  //   table.increments().notNullable();
  //   table.string("açao_recomendada", 600);
  //   references(table, tableNames.user);
  //   table.date("data_conclusao");
  //   table.string("resultados", 1000);
  //   references(table, tableNames.vp);
  // });
};

/**
 * Rollback Changes
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(tableNames.company);
  //   await knex.schema.dropTable(tableNames.açao);
  //   await knex.schema.dropTable(tableNames.vp);
  //   await knex.schema.dropTable(tableNames.cp);
  //   await knex.schema.dropTable(tableNames.epf);
  //   await knex.schema.dropTable(tableNames.mpf);
  //   await knex.schema.dropTable(tableNames.item);
  //   await knex.schema.dropTable(tableNames.user);

  //   await Promise.all(
  //     [
  //       tableNames.vp_name,
  //       tableNames.cp_name,
  //       tableNames.epf_name,
  //       tableNames.user_role,
  //       tableNames.produto,
  //     ].map((tableName) => knex.schema.dropTable(tableName))
  //   );
};
