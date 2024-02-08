import express from 'express';

import { login } from '#controllers/users/login.js';
import { signup } from '#controllers/users/signup.js';
import { logout } from '#controllers/users/logout.js';
import { upload } from '#middleware/avatarsMiddleware.js';
import { authMiddleware } from '#middleware/authMiddleware.js';
import { verifyToken } from '#controllers/users/verifyToken.js';
import { uploadAvatar } from '#controllers/users/uploadAvatar.js';
import { getCurrentUserData } from '#controllers/users/getCurrentUserData.js';
import { resendVerificationEmail } from '#controllers/users/resendVerificationEmail.js';

const usersRouter = express.Router();

usersRouter.post('/login', login);
usersRouter.post('/signup', signup);
usersRouter.get('/logout', authMiddleware, logout);
usersRouter.post('/verify', resendVerificationEmail);
usersRouter.get('/verify/:verificationToken', verifyToken);
usersRouter.get('/current', authMiddleware, getCurrentUserData);
usersRouter.post('/avatars', authMiddleware, upload.single('avatar'), uploadAvatar);

export { usersRouter };
