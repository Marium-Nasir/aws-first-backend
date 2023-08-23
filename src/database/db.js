const mongoose = require('mongoose');

let conn = null;

const uri = 'mongodb+srv://mariumnasir:Marium.123@serverless.qvgqac5.mongodb.net/?retryWrites=true&w=majority';

const connectDb = async()=> {
  if (conn == null) {
    conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
    }).then(() => mongoose);

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;
  }

  return conn;
};

module.exports = {connectDb};