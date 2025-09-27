import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/Config.js';
import mainRouter from './routes/MainRouter.js';
import ExpressError from './utils/ExpressError.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', mainRouter);

// For undefined routes
app.use((req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  res.status(statusCode).json({ error: message });
});

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
