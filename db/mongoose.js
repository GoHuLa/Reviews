const mongoose = require('mongoose');
const icons = require('../src/assets/icons.js');

mongoose.connect('mongodb://localhost/etsy', {useNewUrlParser: true});
const randomIndex = () => Math.floor(Math.random() * icons.length);

const reviewSchema = new mongoose.Schema({
  author: {
    name: String,
    photo: {type: String, default: icons[randomIndex()]}
  },
  rating: Number,
  purchased: Boolean,
  body: String,
  productId: Number,
  photo: String
}, {timestamps: true});

module.exports = {
  model: mongoose.model('Review', reviewSchema),
  db: mongoose
};