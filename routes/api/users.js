import express from 'express';

import { login } from '#controllers/users/login.js';
import { signup } from '#controllers/users/signup.js';
import { authMiddleware } from '#middleware/authMiddleware.js';
import { logout } from '#controllers/users/logout.js';

const usersRouter = express.Router();

usersRouter.post('/signup', signup);
usersRouter.post('/login', login);
usersRouter.get('/logout', authMiddleware, logout);

export { usersRouter };
