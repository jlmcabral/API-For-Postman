/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const knex = require("../config");
const tableNames = require("../src/constants/tableNames");
const query = require("../src/lib/queryHelpers");

/**
 * Promise.allSettled polyfill
 * @param {Promise} promises
 */
Promise.allSettled = (promises) =>
  Promise.all(
    promises.map((promise) =>
      promise
        .then((value) => ({
          status: "fulfilled",
          value,
        }))
        .catch((reason) => ({
          status: "rejected",
          reason,
        }))
    )
  );

exports.getAll = () =>
  new Promise((fulfill, reject) => {
    knex(tableNames.company)
      .select()
      .then((results) => {
        if (results.length === 0) reject(new Error("Não existem empresas"));

        fulfill(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.getById = (id) =>
  new Promise((fulfill, reject) => {
    if (!id) reject(new Error("É necessário fornecer um id de uma empresa"));

    knex(tableNames.company)
      .select()
      .where("id", id)
      .first() // Get only 1 row instead of an array
      .then((results) => {
        if (!results) reject(new Error(`Não existem empresas com o id ${id}`));

        fulfill(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.create = (req) =>
  new Promise((fulfill, reject) => {
    knex(tableNames.company)
      .insert(req.body)
      .then((results) => {
        if (!results) reject(new Error("Empresa não criada"));

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
    let company = {
      ...req.body,
      id: req.params.id,
    };

    this.getById(company.id)
      .then((queriedcompany) => {
        company = {
          ...queriedcompany,
          ...company,
        };

        return knex(tableNames.company).where("id", company.id).update(company);
      })
      .then((results) => {
        if (!results)
          reject(new Error(`Empresa com o id ${company.id} não atualizada`));

        fulfill(company);
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.delete = (req) =>
  new Promise((fulfill, reject) => {
    knex(tableNames.company)
      .where("id", req.params.id)
      .del()
      .then((results) => {
        if (!results)
          reject(new Error(`Não existem empresas com o id ${req.params.id}`));

        fulfill(`Empresa com o id ${req.params.id} apagado com sucesso`);
      })
      .catch((err) => {
        reject(err);
      });
  });
