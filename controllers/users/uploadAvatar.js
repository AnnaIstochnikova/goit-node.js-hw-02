import Jimp from 'jimp';
import path from 'path';
import { promises } from 'fs';

import { mainPath, publicPath } from './public.js';
import { id } from '#middleware/avatarsMiddleware.js';
import { findAndUpdateUser } from '#helpers/helpers.js';

// export async function uploadAvatar(req, res, next) {
//   const { _id } = res.user;
//   try {
//     const { path: oldPath, originalname } = req.file;
//     const extension = path.extname(originalname);
//     await Jimp.read(oldPath)
//       .then(photo => {
//         photo.resize(250, 250).write(`${id}${extension}`);
//         promises.rename(oldPath, publicPath);
//         // findAndUpdateUser({ _id }, { avatarURL:  });
//         return res.json('Hello');
//       })
//       .catch(error => {
//         res.status(404).json(error);
//       });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// }

export async function uploadAvatar(req, res, next) {
  const { _id } = res.user;
  try {
    const { path: oldPath, originalname } = req.file;
    console.log(req.file);
    const extension = path.extname(originalname);
    const photo = await Jimp.read(oldPath);
    if (!photo || !extension) {
      return res.status(404).json({ message: 'There is no photo, try again' });
    }
    photo.resize(250, 250).write(`${id}${extension}`);
    await promises.rename(oldPath, mainPath, () => console.log('renamed'));
    // findAndUpdateUser({ _id }, { avatarURL:  });
    return res.json('Hello');
  } catch (error) {
    console.log(error);
    next(error);
  }
}
