const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

const { Reviews } = require('../db/mongoose.js');

app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.status(200).send(reviews);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/reviews/:id', async (req, res) => {
  try {
    const reviews = await Reviews.find({ prodId: req.params.id.toString() });
    res.status(200).send(reviews);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    let review = new Reviews(req.body);
    review = await review.save();
    res.status(201).send(review);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);
    res.status(204).send(review);
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = app;
