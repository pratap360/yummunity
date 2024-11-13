// appwrite.service.ts

import { Injectable } from '@angular/core';
import { Client, Databases} from 'appwrite';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  // private sdk: Client;
  client = new Client();
  databases : any;


  constructor() {
    this.client
    .setEndpoint(environment.appwrite_Endpoint)
    .setProject(environment.appwrite_ProjectID);
  this.databases  = new Databases(this.client);
  }

  // Method to post a recipe to Appwrite
  async postRecipe(recipeData: any): Promise<any> {
    try {
      const response = await this.databases.createDocument(
        environment.post_CollectionID, 
        'unique()',
        recipeData
      );
      return response;
    } catch (error) {
      console.error('Appwrite Service :: postRecipe() ::', error);
      throw error;
    }
  }
}
