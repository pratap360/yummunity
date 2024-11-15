// appwrite.service.ts

import { Injectable } from '@angular/core';
import { Client, Databases,ID} from 'appwrite';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  // private sdk: Client;
  client = new Client();
  database : any;


  constructor() {
    this.client
    .setEndpoint(environment.appwrite_Endpoint)
    .setProject(environment.appwrite_ProjectID);
  this.database  = new Databases(this.client);
  }

  // Method to post a recipe to Appwrite
  async postRecipe(recipeData: any): Promise<any> {
    try {
      const response = await this.database.createDocument(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID, 
        ID.unique(),
       recipeData
      );
      return console.log('Appwrite Service Response:: postRecipe() ::', response);
    } catch (error) {
      console.error('Appwrite Service :: postRecipe() ::', error);
      throw error;
    }
  }
}
