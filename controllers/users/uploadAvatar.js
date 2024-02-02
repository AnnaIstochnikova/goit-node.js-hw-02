import Jimp from 'jimp';
import path from 'path';
import { promises } from 'fs';

import { publicPath } from './public.js';
import { id } from '#middleware/avatarsMiddleware.js';

export async function uploadAvatar(req, res, next) {
  const user = res.user;

  const { path: oldPath, originalname } = req.file;
  const extension = path.extname(originalname);

  try {
    await Jimp.read(oldPath)
      .then(photo => {
        photo.resize(250, 250).write(`${id}${extension}`);
        promises.rename(oldPath, publicPath);
        return res.json('Hello');
      })
      .catch(error => {
        res.status(404).json(error);
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
