/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const knex = require("../config");
const tableNames = require("../src/constants/tableNames");
const query = require("../src/lib/queryHelpers");

exports.getAll = () =>
  new Promise((fulfill, reject) => {
    knex(tableNames.construction)
      .select()
      .then((results) => {
        if (results.length === 0) reject(new Error("Não existem obras"));

        fulfill(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.getById = (id) =>
  new Promise((fulfill, reject) => {
    if (!id) reject(new Error("É necessário fornecer um id de uma obra"));
    knex(tableNames.construction)
      .select()
      .where("id", id)
      .first() // Get only 1 row instead of an array
      .then((results) => {
        if (!results) reject(new Error(`Não existem obras com o id ${id}`));

        fulfill(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.create = (req) =>
  new Promise((fulfill, reject) => {
    knex(tableNames.construction)
      .insert(req.body)
      .then((results) => {
        if (!results) reject(new Error("Obra não criada"));

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
    let construction = {
      ...req.body,
      id: req.params.id,
    };

    this.getById(construction.id)
      .then((queriedconstruction) => {
        construction = {
          ...queriedconstruction,
          ...construction,
        };

        return knex(tableNames.construction)
          .where("id", construction.id)
          .update(construction);
      })
      .then((results) => {
        if (!results)
          reject(new Error(`Obra com o id ${construction.id} não atualizada`));

        fulfill(construction);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.delete = (req) =>
  new Promise((fulfill, reject) => {
    knex(tableNames.construction)
      .where("id", req.params.id)
      .del()
      .then((results) => {
        if (!results)
          reject(new Error(`Não existem obras com o id ${req.params.id}`));

        fulfill(`Obra com o id ${req.params.id} apagado com sucesso`);
      })
      .catch((err) => {
        reject(err);
      });
  });
