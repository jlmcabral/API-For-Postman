/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const knex = require("../config");
const tableNames = require("../src/constants/tableNames");
const query = require("../src/lib/queryHelpers");

exports.getAll = () =>
  new Promise((fulfill, reject) => {
    knex(tableNames.state)
      .select()
      .then((results) => {
        if (results.length === 0)
          reject(new Error("Não existem estados de obras"));

        fulfill(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.getById = (id) =>
  new Promise((fulfill, reject) => {
    if (!id) reject(new Error("É necessário fornecer um id de uma estado"));
    knex(tableNames.state)
      .select()
      .where("id", id)
      .first() // Get only 1 row instead of an array
      .then((results) => {
        if (!results)
          reject(new Error(`Não existem estados de obras com o id ${id}`));

        fulfill(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.create = (req) =>
  new Promise((fulfill, reject) => {
    knex(tableNames.state)
      .insert(req.body)
      .then((results) => {
        if (!results) reject(new Error("Estado não criado"));

        return query.createdElement(req, results);
      })
      .then((results) => {
        fulfill(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.update = (req) =>
  new Promise((fulfill, reject) => {
    let state = {
      ...req.body,
      id: req.params.id,
    };

    this.getById(state.id)
      .then((queriedstate) => {
        state = {
          ...queriedstate,
          ...state,
        };

        return knex(tableNames.state).where("id", state.id).update(state);
      })
      .then((results) => {
        if (!results)
          reject(new Error(`Estado com o id ${state.id} não atualizado`));

        fulfill(state);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.delete = (req) =>
  new Promise((fulfill, reject) => {
    knex(tableNames.state)
      .where("id", req.params.id)
      .del()
      .then((results) => {
        if (!results)
          reject(
            new Error(`Não existem estados de obras com o id ${req.params.id}`)
          );

        fulfill(`Estado com o id ${req.params.id} apagado com sucesso`);
      })
      .catch((err) => {
        reject(err);
      });
  });
