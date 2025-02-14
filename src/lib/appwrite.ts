// ? this is bydefault code for appwrite config 

import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('yummunity'); // Replace with your project ID

export const database = new Databases(client);
export const account = new Account(client);
export { ID } from 'appwrite';
