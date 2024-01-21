import { Contact } from '../../models/contacts.js';

export async function showContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      return res.status(200).json(contact);
    }
    next();
  } catch (error) {
    next(error);
  }
}
