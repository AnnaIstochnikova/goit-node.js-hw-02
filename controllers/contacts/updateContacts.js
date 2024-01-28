import { findAndUpdateContact } from '#helpers/helpers.js';

export async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  try {
    const body = req.body;
    const isBodyEmpty = Object.keys(body).length === 0;
    if (isBodyEmpty) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const updatedContact = await findAndUpdateContact({ _id: contactId }, body);
    console.log(updatedContact);
    updatedContact !== null ? res.status(200).json(updatedContact) : next();
  } catch (error) {
    next(error);
  }
}
