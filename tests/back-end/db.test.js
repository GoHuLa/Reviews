const mongoose = require('mongoose');
const { Reviews, Products } = require('../../db/mongoose.js');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/etsy');
});
afterAll(() => mongoose.disconnect());

describe('connection and schema tests', () => {
  test('db is connected', () => {
    expect(mongoose.connection.name).toBe('etsy');
  });
  test('db has a reviews collection', () => {
    expect(mongoose.connection.collections).toHaveProperty('reviews');
  });
  test('db has a products collection', () => {
    expect(mongoose.connection.collections).toHaveProperty('products');
  });
});

describe('product collection tests', () => {
  test('has items with a product id, and the product id is a number', async () => {
    const doc = await Products.findOne();
    expect(doc).toHaveProperty('prodId');
    expect(+doc.prodId).not.toBeNaN();
  });
});

describe('review collection', () => {
  test('has the right shape', async () => {
    const review = await Reviews.findOne();
    expect(review).toHaveProperty('author');
    expect(review.author).toHaveProperty('name');
    expect(review).toHaveProperty('purchased');
    expect(review).toHaveProperty('body');
    expect(review).toHaveProperty('photo');
    expect(review).toHaveProperty('prodId');
  });
  test('has items with a product id, and that product id corresponds to a product in the product collection', async () => {
    const review = await Reviews.findOne();
    expect(review).toHaveProperty('prodId');
    const id = review.prodId;
    const product = await Products.findOne({ prodId: id });
    expect(product).not.toBeNull();
  });
  test('has some documents with photos', async () => {
    const review = await Reviews.find({ photo: { $ne: '' } });
    expect(review.length).toBeGreaterThan(0);
  });
  test('has some documents without photos', async () => {
    const review = await Reviews.find({ photo: { $eq: '' } });
    expect(review.length).toBeGreaterThan(0);
  });
});

