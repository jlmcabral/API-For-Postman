const knexfile = require('./knexfile');
// eslint-disable-next-line import/order
const knex = require('knex')(knexfile.development);

module.exports = knex;
