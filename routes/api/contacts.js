import express from 'express';
import { addContact, getContactById, listContacts, removeContact } from '../../models/contacts.js';

const router = express.Router();

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact.length !== 0) {
      res.status(200).json(contact);
      return;
    }
    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/contacts', async (req, res, next) => {
  try {
    const body = req.body;
    const result = await addContact(body);
    const { errorMessage, newContact } = result;
    if (errorMessage) {
      res.status(400).json(`message: ${errorMessage}`);
      return;
    }
    res.status(201).json(newContact);
  } catch (err) {
    return err;
  }
});

router.delete('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    if (contact) {
      await removeContact(contactId);
      res.status(200).json({ message: 'Contact deleted' });
      return;
    }
    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

export { router };
