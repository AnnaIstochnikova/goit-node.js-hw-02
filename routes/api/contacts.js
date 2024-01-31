import express from 'express';

import { showContact } from '#controllers/contacts/showContact.js';
import { indexContacts } from '#controllers/contacts/indexContacts.js';
import { createContact } from '#controllers/contacts/createContact.js';
import { deleteContact } from '#controllers/contacts/deleteContact.js';
import { updateContacts } from '#controllers/contacts/updateContacts.js';
import { updateStatusContact } from '#controllers/contacts/updateStatusContact.js';

const contactsRouter = express.Router();

contactsRouter.get('/', indexContacts);
contactsRouter.post('/', createContact);
contactsRouter.get('/:contactId', showContact);
contactsRouter.put('/:contactId', updateContacts);
contactsRouter.delete('/:contactId', deleteContact);
contactsRouter.patch('/:contactId/favorite', updateStatusContact);

export { contactsRouter };
