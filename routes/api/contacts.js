import express from 'express';
import { getContactById, listContacts } from '../../models/contacts.js';

const router = express.Router();

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/contacts/:contactId', async (req, res, next) => {
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

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

export { router };
