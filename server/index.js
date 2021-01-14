const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;

const Reviews = require('../db/mongoose.js').model;

app.use(bodyparser.json());

app.get('/api/reviews/:id', async (req, res) => {
  try {
    const reviews = await Reviews.find({ prodId: req.params.id });
    res.status(200).send(reviews);
  } catch (err) {
    res.status(400).send();
  }
});

app.listen(port);
