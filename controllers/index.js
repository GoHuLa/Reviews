const axios = require('axios');
const _ = require('lodash');

const getReview = (prodId) => (
  axios.get(`/api/reviews/${prodId}`)
    .then(({ data }) => {
      if (_.isEmpty(data)) {
        throw new Error('no data found');
      }
      return data;
    })
    .catch((err) => err)
);

const getAll = () => (
  axios.get('/api/reviews')
    .then(({ data }) => data)
);

module.exports = {
  getReview,
  getAll,
};
