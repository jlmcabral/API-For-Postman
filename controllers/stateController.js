/* eslint-disable no-console */
const StateService = require("../services/stateService");

/**
 * @param {knex} knex
 */
exports.getAll = (req, res) => {
  StateService.getAll()
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.getById = (req, res) => {
  StateService.getById(req.params.id)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.create = (req, res) => {
  StateService.create(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.update = (req, res) => {
  StateService.update(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.delete = (req, res) => {
  StateService.delete(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};
