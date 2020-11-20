// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
// const orderedTableNames = require("../../src/constants/orderedTableNames");
const tableNames = require("../../src/constants/tableNames");

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const state = [
    { name: "Em análise financeira" },
    { name: "Início agendado" },
    { name: "Terminada" },
    { name: "Em construção" },
    { name: "Aguardando pagamento" },
  ];
  await knex(tableNames.state).insert(state);

  const company = [
    { name: "Nome da empresa 1", nif: 12345678 },
    { name: "Nome da empresa 2", nif: 98765432 },
    { name: "Nome da empresa 3", nif: 40011000 },
  ];
  await knex(tableNames.company).insert(company);

  const construction = [
    {
      ref: "OB001",
      name: "Obra do Sr. Martins",
      description: "esta obra tem a seguinte descrição",
      quotation: 4010,
      company_id: 1,
      state_id: 1,
    },
    {
      ref: "OB002",
      name: "Obra do Sr. Manuel",
      description: "esta obra tem a seguinte descrição",
      quotation: 500,
      company_id: 1,
      state_id: 3,
    },
    {
      ref: "OB003",
      name: "Obra do Sr. Antonio",
      description: "esta obra tem a seguinte descrição",
      quotation: 677,
      company_id: 3,
      state_id: 4,
    },
    {
      ref: "OB004",
      name: "Obra do sra. Maria",
      description: "esta obra tem a seguinte descrição",
      quotation: 10500,
      company_id: 2,
      state_id: 5,
    },
  ];
  await knex(tableNames.construction).insert(construction);
};
