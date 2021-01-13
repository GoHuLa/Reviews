/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const {expect, assert} = require('chai');
const mongoose = require('../db/mongoose.js');
const axios = require('axios');
const url = 'http://localhost:3000'

const gimmickReview = {
  author: {
    name: "Jon"
  },
  rating: 4,
  purchased: true,
  body: "Great product!"
};

describe('Basic CRUD', function() {
  describe('Retrieval', function() {
    it('should connect to the db', function() {
      let conn = mongoose.db.connection.name;
      expect(conn).to.equal('etsy');
    });
    it('should have 100 documents', async function() {
      const docs = await mongoose.model.find();
      expect(docs).to.have.length(100);
    })
    it('should retrieve stored documents', async function() {
      try {
        const docs = await mongoose.model.findOne();
        expect(docs).to.not.equal(null);
      } catch (err) {
        console.log(err);
        assert.fail();
      }
    });
    it('should have documents with photos in it', async function() {
      const docWithPhoto = await mongoose.model.findOne({photo: {$ne: ''}});
      expect(docWithPhoto).to.be.a('object');
    });
    it('should have documents without photos', async function() {
      const docsWithoutPhoto = await mongoose.model.findOne({photo: {$eq: ''}})
      expect(docsWithoutPhoto).to.exist;
    })
  })

  describe('Insert', function() {
    before(async function() {
      await mongoose.model.findOneAndDelete();
    });
    it('should insert a document into the db', async function() {
      const r = new mongoose.model(gimmickReview);
      const docs = await r.save();
      expect(docs).to.be.a('object');
    });
    it('should have timestamps', async function() {
      const doc = await mongoose.model.findOne();
      expect(doc.createdAt).to.not.be.null;
    });
  });

  describe('Deletion', function() {
    let id;
    beforeEach(async function() {
      const toBeDeleted = new mongoose.model(gimmickReview);
      await toBeDeleted.save();
      id = toBeDeleted._id;
    });
    it('should delete a record', async function() {
      console.log(id);
      await mongoose.model.findByIdAndDelete(id);
      const records = await mongoose.model.findById(id);
      expect(records).to.be.null;
    });
  });
})

describe('Server', function() {
  describe('GETs', function() {
    it('should return a doc with the author name as the endpoint', async function() {
      const {data} = await axios.get(url + '/api/reviews/Jan%20Barnett')
      expect(data).to.be.a('object');
      expect(data.author.name).to.equal('Jan Barnett');
    })
  })
})