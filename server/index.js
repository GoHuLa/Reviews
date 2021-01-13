const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;

const Reviews = require('../db/mongoose.js').model;

app.use(bodyparser.json());

app.get('/api/reviews/:author', async (req, res) => {
  try {
    const review = await Reviews.findOne({'author.name': decodeURI(req.params.author)});
    res.status(200).send(review);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
})

app.listen(port);