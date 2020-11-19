/* eslint-disable array-callback-return */
/**
* Genereates a new Object with the element that been created with the ID information
* @param {*} req
*/
exports.createdElement = (req, results) => new Promise((fulfill, reject) => {
  const i = results[0];
  const newObject = {
    id: i,
    ...req.body,
  };

  fulfill(newObject);
});
