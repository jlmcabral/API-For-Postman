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

exports.getByRef = (ref) =>
  new Promise((fulfill, reject) => {
    if (!ref) reject(new Error("É necessário fornecer uma ref de uma obra"));
    knex(tableNames.construction)
      .select()
      .where("ref", ref)
      .first() // Get only 1 row instead of an array
      .then((results) => {
        if (!results) reject(new Error(`Não existem obras com a ref ${ref}`));

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
      ref: req.params.ref,
    };

    this.getByRef(construction.ref)
      .then((queriedconstruction) => {
        construction = {
          ...queriedconstruction,
          ...construction,
        };

        return knex(tableNames.construction)
          .where("ref", construction.ref)
          .update(construction);
      })
      .then((results) => {
        if (!results)
          reject(

            new Error(`Obra com a ref ${construction.ref} não atualizada`)

          );

        fulfill(construction);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.delete = (req) =>
  new Promise((fulfill, reject) => {
    knex(tableNames.construction)
      .where("ref", req.params.ref)
      .del()
      .then((results) => {
        if (!results)
          reject(new Error(`Não existem obras com a ref ${req.params.ref}`));

        fulfill(`Obra com a ref ${req.params.ref} apagado com sucesso`);
      })
      .catch((err) => {
        reject(err);
      });
  });
