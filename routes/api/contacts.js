import express from 'express';

import { showContact } from '#controllers/contacts/showContact.js';
import { indexContacts } from '#controllers/contacts/indexContacts.js';
import { createContact } from '#controllers/contacts/createContact.js';
import { deleteContact } from '#controllers/contacts/deleteContact.js';
import { updateContacts } from '#controllers/contacts/updateContacts.js';

const router = express.Router();

router.get('/', indexContacts);
router.post('/', createContact);
router.get('/:contactId', showContact);
router.put('/:contactId', updateContacts);
router.delete('/:contactId', deleteContact);

export { router };
