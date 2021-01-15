/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const http = require('http');
const app = require('../server/index');
const { Reviews } = require('../db/mongoose.js');

const request = supertest(app);

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});
afterAll((done) => {
  server.close(done);
});

const reqAtId = (id) => request.get(`/api/reviews/${id}`);
const blankSchema = {
  author: {
    name: '',
    photo: '',
  },
  rating: '',
  purchased: '',
  body: '',
  photo: '',
  prodId: '',
};
const testReview = {
  author: {
    name: 'Jon',
  },
  rating: 4,
  purchased: true,
  body: 'Great product!',
  photo: '',
  prodId: 1,
};
const schemaProps = Object.getOwnPropertyNames(blankSchema);

describe('endpoint tests', () => {
  describe('GETs', () => {
    test('should receive empty array no products found', async () => {
      const res = await reqAtId(200);
      expect(res.body).toEqual(expect.any(Array));
      expect(res.body).toHaveLength(0);
    });
    test('should receive array of products if productId found', async () => {
      const res = await reqAtId(2);
      expect(res.body).toEqual(expect.any(Array));
      expect(res.body.length).toBeGreaterThan(0);
      const props = Object.getOwnPropertyNames(res.body[0]);
      expect(props).toEqual(expect.arrayContaining(schemaProps));
    });
  });
  describe('POSTs', () => {
    let res;
    beforeAll(async () => {
      res = await request.post('/api/reviews').send(testReview);
    });
    afterAll(async () => {
      await Reviews.findByIdAndDelete(res.body._id);
    });
    test('should receive a properly formatted JSON input and return an  obj with a 201', () => {
      expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
    });
    test('res object should have an _id createdAt property', () => {
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('createdAt');
    });
    test('should insert the object into the DB', async () => {
      const reviews = await Reviews.find();
      expect(reviews).toHaveLength(101);
    });
  });
  describe('DELETEs', () => {
    let res;
    beforeAll(async () => {
      res = await request.post('/api/reviews').send(testReview);
      res = await request.delete(`/api/reviews/${res.body._id}`);
    });
    test('removes document with given ID from DB', async () => {
      const deletedReview = await Reviews.findOne({ 'author.name': 'Jon' });
      expect(deletedReview).toBeNull();
    });
  });
});
