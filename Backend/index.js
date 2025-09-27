import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/Config.js';

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(`Connected to database...`);
  } catch (err) {
    console.log(`Could not connect to database... ${err}`);
  }

  app.listen(config.port, () => {
    console.log(`App is listening on port... ${config.port}`);
  });
};

start();
