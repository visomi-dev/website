import mongoose from 'mongoose';

const URI = process.env.MONGO_DB_URL;
const CONFIG = { useNewUrlParser: true, useUnifiedTopology: true };

const createDBConnection = (): Promise<mongoose.Connection> => (
  new Promise((resolve, reject) => {
    mongoose.connect(URI, CONFIG);
    mongoose.connection
      .once('open', () => { resolve(mongoose.connection); })
      .on('error', (error) => { reject(error); });
  })
);

export default createDBConnection;
