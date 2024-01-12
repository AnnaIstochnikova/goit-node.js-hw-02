import express from 'express';

import { showContact } from '../../controllers/contacts/showContact.js';
import { indexContacts } from '../../controllers/contacts/indexContacts.js';
import { createContact } from '../../controllers/contacts/createContact.js';
import { deleteContact } from '../../controllers/contacts/deleteContact.js';
import { updateContacts } from '../../controllers/contacts/updateContacts.js';

const router = express.Router();

router.get('/contacts', indexContacts);
router.post('/contacts', createContact);
router.get('/contacts/:contactId', showContact);
router.put('/contacts/:contactId', updateContacts);
router.delete('/contacts/:contactId', deleteContact);

export { router };
