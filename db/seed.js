const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
  database: 'mongodb://localhost/etsy',
  dropDatabase: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve(__dirname));

const seed = async () => seeder.import(collections);
seed().then(() => console.log('seeded'));
