const axios = require('axios');
const _ = require('lodash');

const url = 'http://52.53.221.54:3001';
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
