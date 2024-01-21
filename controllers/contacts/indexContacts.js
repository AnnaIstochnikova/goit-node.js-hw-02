import { Contact } from '../../models/contacts.js';

export async function indexContacts(req, res, next) {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}
