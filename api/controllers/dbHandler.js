const path = require('path');
const logger = require('log4js').getLogger(
  `${path.basename(__filename).split('.')[0]}`
);
const mongoClient = require('../utils/connect2db');
const { decrypt } = require('../crypto/fileCrypto');

const MONGO_DB_SCHOOL_INFO = decrypt(process.env.MONGO_DB_SCHOOL_INFO);
const MONGO_COL_SIGNUP_INFO = decrypt(process.env.MONGO_COL_SIGNUP_INFO);

async function getData(db, table, page, pageSize) {
  let connection;
  try {
    connection = await mongoClient.getDb();
    const collection = connection.db(db).collection(table);

    const data = await collection
      .aggregate([
        { $sort: { Roll: -1 } },
        {
          $project: {
            _id: 0
          }
        },
        { $skip: page * pageSize },
        { $limit: pageSize }
      ])
      .toArray();

    return data;
  } catch (err) {
    logger.error(`Error in getting data of table: ${table} db: ${db}`);
    throw err;
  } finally {
    if (connection.isConnected()) await connection.close();
  }
}

async function signIn(signInDetails) {
  let connection;
  try {
    connection = await mongoClient.getDb();
    const collection = connection
      .db(MONGO_DB_SCHOOL_INFO)
      .collection(MONGO_COL_SIGNUP_INFO);

    const res = await collection.findOne({
      Email: signInDetails.Email
    });

    if (res) {
      if (res.Password === signInDetails.Password) {
        return {
          success: true,
          message: 'Logged in successfully',
          user: res
        };
      } else {
        return {
          success: false,
          message: 'Password is Incorrect'
        };
      }
    } else {
      return {
        success: false,
        message: 'User is not registered,Please register and try again'
      };
    }
  } catch (err) {
    logger.error(
      `Error in inserting data into table: ${MONGO_COL_SIGNUP_INFO} db: ${MONGO_DB_SCHOOL_INFO}`
    );
    throw err;
  } finally {
    if (connection.isConnected()) await connection.close();
  }
}

async function signUp(signUpDetails) {
  let connection;
  try {
    connection = await mongoClient.getDb();
    const collection = connection
      .db(MONGO_DB_SCHOOL_INFO)
      .collection(MONGO_COL_SIGNUP_INFO);

    const userExists = await collection.findOne({
      Email: signUpDetails.Email
    });

    if (userExists) {
      return {
        success: false,
        message: 'User already exits'
      };
    }

    const response = await collection.insertOne(signUpDetails);
    if (response.result.n >= 1) {
      return {
        success: true,
        message: 'User registered successfully'
      };
    } else {
      return {
        success: false,
        message: 'User registration unsuccessful'
      };
    }
  } catch (err) {
    logger.error(
      `Error in inserting data into table: ${MONGO_COL_SIGNUP_INFO} db: ${MONGO_DB_SCHOOL_INFO}`
    );
    throw err;
  } finally {
    if (connection.isConnected()) await connection.close();
  }
}

module.exports = { getData, signIn, signUp };
