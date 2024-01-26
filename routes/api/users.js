import express from 'express';
import { signup } from '../../controllers/users/signup.js';

const usersRouter = express.Router();

usersRouter.post('/signup', signup);

export { usersRouter };
