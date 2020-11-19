// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
// const orderedTableNames = require("../../src/constants/orderedTableNames");
const tableNames = require("../../src/constants/tableNames");

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // await Promise.all(
  //   orderedTableNames.map((tableName) => knex(tableName).del()),
  // );

  const company = [
    { name: "Nome da company 1", nif: 12345678 },
    { name: "Nome da company 2", nif: 98765432 },
  ];
  await knex(tableNames.company).insert(company);
};
