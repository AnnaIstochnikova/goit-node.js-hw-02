import express from 'express';

import { login } from '#controllers/users/login.js';
import { signup } from '#controllers/users/signup.js';

const usersRouter = express.Router();

usersRouter.post('/signup', signup);
usersRouter.post('/login', login);

export { usersRouter };
