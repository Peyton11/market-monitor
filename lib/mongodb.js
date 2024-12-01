import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
}

async function disconnect() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

export { connect, disconnect };

