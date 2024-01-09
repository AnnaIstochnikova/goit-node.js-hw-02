import { promises } from 'fs';
import path from 'path';

const contactsPath = path.join(process.cwd(), 'models/contacts.json');

const listContacts = async () => {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return error.message;
  }
};

const getContactById = async contactId => {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const searchContact = contacts.filter(contact => contact.id === contactId);
    return searchContact;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

export { listContacts, getContactById, removeContact, addContact, updateContact };
