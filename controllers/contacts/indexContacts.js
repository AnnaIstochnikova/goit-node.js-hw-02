import { listContacts } from '#models/contacts.js';

export async function indexContacts(req, res) {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
