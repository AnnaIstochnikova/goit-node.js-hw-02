import { getAllContacts } from '#helpers/helpers.js';

export async function indexContacts(req, res, next) {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}
