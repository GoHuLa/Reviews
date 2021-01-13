const {Seeder} = require('mongo-seeding');
const path = require('path');
const config = {
  database: 'mongodb://localhost/etsy',
  dropDatabase: true
}

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve(__dirname));

const seed = async () => {
    try {
    return await seeder.import(collections);
  } catch (err) {
    console.log('Error: ', err);
  }
};
seed().then(() => console.log('seeded'));
