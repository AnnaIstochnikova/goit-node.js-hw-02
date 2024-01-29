import { getAllContacts } from '#helpers/helpers.js';

export async function indexContacts(req, res, next) {
  try {
    const user = res.user;
    const contacts = await getAllContacts(user);
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}
