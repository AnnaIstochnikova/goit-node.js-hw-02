import { updateContact } from '#models/contacts.js';

export async function updateContacts(req, res) {
  const { contactId } = req.params;
  try {
    const body = req.body;
    const result = await updateContact(contactId, body);
    const { errorType, errorMessage, updatedContact } = result;
    if (errorType) {
      return res.status(errorType).json(`Message: ${errorMessage}`);
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    return err;
  }
}
