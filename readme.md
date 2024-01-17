# Contacts REST API

This project provides a simple API for managing a collection of contacts. 

## Installation
To get started with the Contacts REST API, follow these steps:
1. Clone the repository to your local machine:
   git clone https://github.com/AnnaIstochnikova/goit-node.js-hw-02
2. Navigate to the project directory:
   cd goit-node.js-hw-02
3. Install the dependencies:
   npm install

## Postman Instructions

### List Contacts
1. Set the request type to GET.
2. Set the request URL to http://localhost:3000/api/contacts.
3. Click on the "Send" button to retrieve a list of all contacts.
   ![image](https://github.com/AnnaIstochnikova/goit-node.js-hw-02/assets/122437399/1255991f-925a-47fc-9bab-4bcc0dd210b1)

### Get Contact by ID
1. Set the request type to GET.
2. Set the request URL to http://localhost:3000/api/contacts/:id (replace :id with the actual contact ID).
3. Click on the "Send" button to retrieve the specific contact.
   ![image](https://github.com/AnnaIstochnikova/goit-node.js-hw-02/assets/122437399/a44a8510-6293-4be8-b9fb-b367c71553b9)

### Add Contact
1. Set the request type to POST.
2. Set the request URL to http://localhost:3000/api/contacts.
3. Set the request body to raw JSON with the contact details:
{
  "name": "Alice Wonderland",
  "email": "alice@wonderland.com",
  "phone": "123-340-493"
}
4. Click on the "Send" button to add a new contact.
  ![image](https://github.com/AnnaIstochnikova/goit-node.js-hw-02/assets/122437399/ffebf42f-a4b1-4e76-84c9-767d85e2a1e3)

### Delete Contact
1. Set the request type to DELETE.
2. Set the request URL to http://localhost:3000/api/contacts/:id (replace :id with the actual contact ID).
3. Click on the "Send" button to delete the specific contact.
   ![image](https://github.com/AnnaIstochnikova/goit-node.js-hw-02/assets/122437399/3d7f8f1f-c3b4-4fc2-913a-3b4c7efd476d)

### Update Contact
1. Set the request type to PUT.
2. Set the request URL to http://localhost:3000/api/contacts/:id (replace :id with the actual contact ID).
3. Set the request body to raw JSON with the updated contact details:
{
  "name": "Cheshire Cat",
  "email": "cheshire@wonderland.com",
  "phone": "229-384-384"
}
4. Click on the "Send" button to update the specific contact.
   ![image](https://github.com/AnnaIstochnikova/goit-node.js-hw-02/assets/122437399/52b609c3-957d-4520-bd01-87255d911624)
