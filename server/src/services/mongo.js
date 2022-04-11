const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.NODE_ENV == 'test' ? process.env.MONGO_TEST : process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
};

async function mongoDisconnect() {
  await mongoose.disconnect();
};

async function cleanDatabase() {
  const collections = await mongoose.connection.db.collections()

  for await(let collection of collections) {
    collection.deleteMany()
  }
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
  cleanDatabase
}