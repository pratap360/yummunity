


import { Client, Account } from "appwrite";

const client = new Client()
    .setProject('<PROJECT_ID>'); // Your project ID

const account = new Account(client);