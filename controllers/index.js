const axios = require('axios');
const _ = require('lodash');

const url = 'http://54.177.240.142:3001'; // me
// const url = 'http://54.90.53.234:3001'; // joey
// const url = 'http://3.15.40.71:3001'; // pablo
// const url = 'http://localhost:3001';

const getReview = (prodId) => (
  axios.get(`${url}/api/reviews/${prodId}`)
    .then(({ data }) => {
      if (_.isEmpty(data)) {
        throw new Error('no data found');
      }
      return data;
    })
    .catch((err) => err)
);

const getAll = () => (
  axios.get(`${url}/api/reviews`)
    .then(({ data }) => data)
);

module.exports = {
  getReview,
  getAll,
};
