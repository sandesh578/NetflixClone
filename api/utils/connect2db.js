const mongoose = require('mongoose');
const util = require('util');
const log4js = require('log4js');
const dotenv = require('dotenv');

const logger = log4js.getLogger('connect2db');

dotenv.config({ path: '../.env.dev' });

const DB_CONNECTION = process.env.DB_CONNECTION;
let client;

async function connectDb() {
  await mongoose
    .connect(DB_CONNECTION, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then((result) => {
      client = result;
      logger.info('Connected to database');
    })
    .catch((err) => {
      logger.error(
        `Unable to connect to database \n${util.inspect(err, null, null)}`
      );
      throw new Error(err);
    });

  return client;
}

async function getDb() {
  if (client) {
    return client;
  }
  return connectDb();
}

async function closeDB() {
  if (client) {
    return client.close();
  }
  return;
}

module.exports = {
  getDb,
  connectDb,
  closeDB
};
