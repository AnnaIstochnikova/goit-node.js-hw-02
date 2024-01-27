import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { User } from '#models/schemas/user.js';
import { validateUser } from '#models/validateUser.js';

dotenv.config();

const { secret } = process.env;

export async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const { error } = await validateUser(email, password);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const user = await User.findOne({ email });
    const { subscription } = user;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
    const payload = {
      email,
      subscription,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '3h' });
    await User.findOneAndUpdate({ email }, { token });
    return res.status(200).json({ token, user: email, subscription });
  } catch (error) {
    next(error);
  }
}
