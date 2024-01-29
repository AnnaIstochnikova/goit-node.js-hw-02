import { Contact } from '../models/schemas/contact.js';
import { User } from '../models/schemas/user.js';

const getAllContacts = () => Contact.find();
const findAndDeleteContact = id => Contact.findByIdAndDelete(id);
const addNewContact = contact => Contact.create(contact);
const findContact = filter => Contact.findOne(filter);
const findAndUpdateContact = (filter, updateField) =>
  Contact.findOneAndUpdate(filter, updateField, { new: true });

const findUser = filter => User.findOne(filter);
const findAndUpdateUser = (filter, updateField) =>
  User.findOneAndUpdate(filter, updateField, { new: true });

export {
  findUser,
  getAllContacts,
  findAndDeleteContact,
  addNewContact,
  findContact,
  findAndUpdateContact,
  findAndUpdateUser,
};
