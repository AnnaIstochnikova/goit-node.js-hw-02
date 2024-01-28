import { findContact } from '#helpers/helpers.js';

export async function showContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await findContact(contactId);
    contact ? res.status(200).json(contact) : next();
  } catch (error) {
    next(error);
  }
}
