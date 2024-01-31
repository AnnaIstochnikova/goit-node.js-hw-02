import express from 'express';
import multer from 'multer';

import { login } from '#controllers/users/login.js';
import { signup } from '#controllers/users/signup.js';
import { logout } from '#controllers/users/logout.js';
import { authMiddleware } from '#middleware/authMiddleware.js';
import { getCurrentUserData } from '#controllers/users/getCurrentUserData.js';
import { uploadAvatar } from '#controllers/users/uploadAvatar.js';
import { storage } from '#middleware/avatarsMiddleware.js';

const usersRouter = express.Router();
const upload = multer({
  dest: storage,
});

usersRouter.post('/signup', signup);
usersRouter.post('/login', login);
usersRouter.get('/logout', authMiddleware, logout);
usersRouter.get('/current', authMiddleware, getCurrentUserData);
usersRouter.post('/avatars', upload.single('avatar'), uploadAvatar);

export { usersRouter };
