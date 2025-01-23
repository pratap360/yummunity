// appwrite.service.ts

import { Injectable } from '@angular/core';
import { Client, Databases, Storage, ID } from 'appwrite';
import { environment } from '../environments/environment';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  // private sdk: Client;
  client = new Client();
  database: any;
  storage: any;

  constructor() {
    this.client
      .setEndpoint(environment.appwrite_Endpoint)
      .setProject(environment.appwrite_ProjectID);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async userData(userInfo: any): Promise<any> {
    try {
      const response = await this.database.createDocument(
        environment.appwrite_DatabaseID,
        environment.users_CollectionID,
        ID.unique(),
        userInfo
      );
      return console.log('Appwrite Service Response:: userData() ::', response);
    } catch (error) {
      console.error('Appwrite Service :: userData() ::', error);
      throw error;
    }
  }

  // async postRecipe(recipeData: any): Promise<any> {
  //   try {
  //     if(!recipeData.post_Content_Pictures){
  //       recipeData.post_Content_Pictures = []
  //       const uploadImage = await this.storage.createFile(
  //         environment.appwrite_BucketID_PostImages,
  //         ID.unique(), // fileId
  //         document.getElementById('uploadImage').files[], // file
  //         ["read("any")"] // permissions (optional)
  //       );
  //     }
  //     const response = await this.database.createDocument(
  //       environment.appwrite_DatabaseID,
  //       environment.post_CollectionID,
  //       ID.unique(),
  //      recipeData
  //     );

  //     return console.log('Appwrite Service Response:: postRecipe() ::', response,this.uploadImage);
  //   } catch (error) {
  //     console.error('Appwrite Service :: postRecipe() ::', error);
  //     throw error;
  //   }
  // }

  // const uploadImage = await this.storage.createFile(
  //   environment.appwrite_BucketID_PostImages,
  //   ID.unique(), // fileId
  //   document.getElementById('uploadImage').files[], // file
  //   ["read("any")"] // permissions (optional)
  // );

  // async postRecipewithImage(recipeData: any,imageUrls: string[]): Promise<any> {
  //   try {
  //     // Ensure post_Content_Pictures is an array
  //     if (!recipeData.post_Content_Pictures) {
  //       recipeData.post_Content_Pictures = imageUrls
  //     }

  //     const files = (document.getElementById('uploadImage') as HTMLInputElement)?.files;

  //     if (files) {
  //       if (files.length > 4) {
  //         throw new Error('You can upload a maximum of 4 images.');
  //       }

  //       for (let i = 0; i < files.length; i++) {
  //         const file = files[i];

  //         console.log('Uploading file:', files);

  //         // Upload each image to Appwrite bucket
  //         const uploadResponse = await this.storage.createFile(
  //           environment.appwrite_BucketID_PostImages,
  //           ID.unique(),
  //           file,
  //         );
  //         // Add the uploaded image details to the post_Content_Pictures array
  //         recipeData.post_Content_Pictures.push(uploadResponse.$id);

  //         console.log('Upload Response:', uploadResponse);

  //       }
  //     }
  //     // Create the recipe document in the database
  //     const response = await this.database.createDocument(
  //       environment.appwrite_DatabaseID,
  //       environment.post_CollectionID,
  //       ID.unique(),
  //       recipeData
  //     );

  //     console.log('Appwrite Service Response:: postRecipewithImage() ::', response);

  //   } catch (error) {
  //     console.error('Appwrite Service :: postRecipewithImage() ::', error);
  //     throw error;
  //   }
  // }

  uploadFiles(files: File[]): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.storage.createFile(
        environment.appwrite_BucketID_PostImages,
        ID.unique(),
        file
      )
    );

    return Promise.all(uploadPromises).then((responses) =>
      responses.map((response) =>
        this.storage.getFileView(
          environment.appwrite_BucketID_PostImages,
          response.$id
        )
      )
    );
  }

  createPost(data: any) {
    return this.database.createDocument(
      environment.appwrite_DatabaseID,
      environment.post_CollectionID,
      ID.unique(),
      data
    );
  }

  // Fetch posts from the collection
  getPostsId(): Observable<{ documents: Array<any> }> {
    const promise = this.database.listDocuments(
      environment.appwrite_DatabaseID,
      environment.post_CollectionID
    );
    // return promise
    // return from(promise.then((response: { documents: Array<{ $id: string }> }) => response.documents.map((doc) => doc.$id)));
    return from(promise as Promise<{ documents: Array<any> }>).pipe(
      map((response: { documents: Array<any> }) => response)
    );
  }

  // async getPost(): Promise<any> {
  //   try {
  //     const response = await this.database.getDocument(
  //       environment.appwrite_DatabaseID,
  //       environment.users_CollectionID,

  //     );
  //     return response;
  //   }
  //   catch (error) {
  //     console.error('Appwrite Service :: getPost() ::', error);
  //     throw error;
  //   }
  // }
}
