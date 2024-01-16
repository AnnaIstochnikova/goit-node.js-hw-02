import { addContact } from '#models/contacts.js';

export async function createContact(req, res) {
  try {
    const body = req.body;
    const result = await addContact(body);
    const { errorMessage, newContact } = result;
    if (errorMessage) {
      return res.status(400).json(`Message: ${errorMessage}`);
    }
    res.status(201).json(newContact);
  } catch (err) {
    return err;
  }
}