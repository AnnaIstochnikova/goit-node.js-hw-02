import Joi from 'joi';
import path from 'path';
import { promises } from 'fs';
import { nanoid } from 'nanoid';

const contactsPath = path.join(process.cwd(), 'models/contacts.json');
const schemaAdd = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
});

const schemaUpdate = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required(),
});

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
    const searchContact = contacts.filter(contact => contact?.id === contactId);
    return searchContact[0];
  } catch (error) {
    return error.message;
  }
};

const removeContact = async contactId => {
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactsAfterDelete = contacts.filter(contact => contact?.id !== contactId);
    const updatedContactList = JSON.stringify(contactsAfterDelete);
    if (contactsAfterDelete !== contacts) {
      await promises.writeFile(contactsPath, updatedContactList);
    }
  } catch (error) {
    return error.message;
  }
};

const addContact = async body => {
  const { name, email, phone } = body;
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    await schemaAdd.validateAsync({ name, email, phone });
    const newContact = { id: nanoid(), name, email, phone };
    const updatedContactList = [...contacts, newContact];
    await promises.writeFile(contactsPath, JSON.stringify(updatedContactList));
    return { newContact };
  } catch (error) {
    const errorReason = error.details[0].path.toString();
    return { errorMessage: `missing required ${errorReason} - field` };
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const isBodyEmpty = Object.keys(body).length === 0;
  if (isBodyEmpty) {
    return { errorType: 400, errorMessage: `Missing fields` };
  }
  try {
    const data = await promises.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);
    const search = contacts.find(contact => contact?.id === contactId);
    const index = contacts.indexOf(search);
    if (!search) {
      return { errorType: 404, errorMessage: `Not found` };
    }

    await schemaUpdate.validateAsync({ name, email, phone });

    const updatedContact = {
      id: search.id,
      name: name !== undefined ? name : search.name,
      email: email !== undefined ? email : search.email,
      phone: phone !== undefined ? phone : search.phone,
    };
    contacts[index] = updatedContact;

    await promises.writeFile(contactsPath, JSON.stringify(contacts));

    return { updatedContact };
  } catch (error) {
    return error.message;
  }
};

export { listContacts, getContactById, removeContact, addContact, updateContact };
