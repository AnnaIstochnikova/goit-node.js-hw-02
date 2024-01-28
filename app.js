import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { usersRouter } from './routes/api/users.js';
import { contactsRouter } from './routes/api/contacts.js';
import passportAuth from './config/jwt.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
const { URI_DB: uriDb } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(uriDb);
    console.log('DB connection successful.');
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (err) {
    console.log(`DB connection error:${err}`);
    process.exit(1);
  }
};

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
passportAuth();
app.use(express.urlencoded({ extended: false }));

app.use('/api/contacts', authMiddleware, contactsRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Contact with the given ID was not found' });
});

app.use((err, req, res, next) => {
  const ValidationErrorReason = Object.keys(err?.errors)[0];
  err.name === 'ValidationError'
    ? res.status(400).json({ message: `Missing required ${ValidationErrorReason} - field` })
    : res.status(500).json({ message: err.message });
});

connectDB();

export { app };
