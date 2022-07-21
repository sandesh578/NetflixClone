const { decrypt } = require('../crypto/fileCrypto');
const mongoClient = require('../utils/connect2db');
const { getData } = require('../controllers/dbHandler');

const MONGO_DB_SCHOOL_INFO = decrypt(process.env.MONGO_DB_SCHOOL_INFO);
const MONGO_COL_STUDENTS_INFO = decrypt(process.env.MONGO_COL_STUDENTS_INFO);

async function initiateIngestion(studentInfo) {
  const client = await mongoClient.getDb();

  const res = await client
    .db(MONGO_DB_SCHOOL_INFO)
    .collection(MONGO_COL_STUDENTS_INFO)
    .insertOne(studentInfo);

  if (res.result.n >= 1) {
    return true;
  } else {
    return false;
  }
}

async function getStudentsData(page, pageSize) {
  return await getData(
    MONGO_DB_SCHOOL_INFO,
    MONGO_COL_STUDENTS_INFO,
    page,
    pageSize
  );
}

async function deleteStudentsData(Roll) {
  const client = await mongoClient.getDb();

  const res = await client
    .db(MONGO_DB_SCHOOL_INFO)
    .collection(MONGO_COL_STUDENTS_INFO)
    .deleteOne({ Roll: Roll });

  if (res.result.n >= 1) {
    return true;
  } else {
    return false;
  }
}

async function updateStudentsData(Roll, data) {
  const client = await mongoClient.getDb();

  const res = await client
    .db(MONGO_DB_SCHOOL_INFO)
    .collection(MONGO_COL_STUDENTS_INFO)
    .updateOne({ Roll: Roll }, { $set: data });

  if (res.result.n >= 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  initiateIngestion,
  getStudentsData,
  deleteStudentsData,
  updateStudentsData
};
