/* eslint-disable no-console */
const CompanyService = require("../services/companyService");

/**
 * @param {knex} knex
 */
exports.getAll = (req, res) => {
  CompanyService.getAll()
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.getById = (req, res) => {
  CompanyService.getById(req.params.id)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.create = (req, res) => {
  CompanyService.create(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.update = (req, res) => {
  CompanyService.update(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.delete = (req, res) => {
  CompanyService.delete(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};
