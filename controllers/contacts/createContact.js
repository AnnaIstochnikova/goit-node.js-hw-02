import { addNewContact } from '../../helpers/helpers.js';

export async function createContact(req, res, next) {
  try {
    const body = req.body;
    const newContact = await addNewContact(body);
    newContact ? res.status(201).json(newContact) : next();
  } catch (error) {
    next(error);
  }
}
