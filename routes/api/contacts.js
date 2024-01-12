import express from 'express';

import { addContact, getContactById, removeContact, updateContact } from '../../models/contacts.js';
// import { indexContacts } from '../../controllers/contacts/indexContacts.js';

const router = express.Router();

// router.get('/contacts', async (req, res) => indexContacts(req, res));

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

router.post('/contacts', async (req, res) => {
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

router.put('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const body = req.body;
    const result = await updateContact(contactId, body);
    const { errorType, errorMessage, updatedContact } = result;
    if (errorType === 404) {
      res.status(404).json(`message: ${errorMessage}`);
      return;
    } else if (errorType === 400) {
      res.status(400).json(`message: ${errorMessage}`);
      return;
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    return err;
  }
});

export { router };
