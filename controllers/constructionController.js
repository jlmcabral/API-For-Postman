/* eslint-disable no-console */
const ConstructionService = require("../services/constructionService");

/**
 * @param {knex} knex
 */
exports.getAll = (req, res) => {
  ConstructionService.getAll()
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.getByRef = (req, res) => {
  ConstructionService.getByRef(req.params.ref)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.create = (req, res) => {
  ConstructionService.create(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.update = (req, res) => {
  ConstructionService.update(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};

exports.delete = (req, res) => {
  ConstructionService.delete(req)
    .then((values) => {
      res.status(200).send(values);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });
};
