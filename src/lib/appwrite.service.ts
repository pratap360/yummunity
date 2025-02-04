// appwrite.service.ts

import { Injectable } from '@angular/core';
import { Client, Databases, Storage, ID,Query  } from 'appwrite';
import { environment } from '../environments/environment';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { timer } from 'rxjs';

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

  createBlogPost(data: any) {
    return this.database.createDocument(
      environment.appwrite_DatabaseID,
      environment.blogpost_CollectionID,
      ID.unique(),
      data
    );
  }

  getAllPosts(): Observable<{ documents: Array<any> }> {
    const pollInterval = 60000; // 60 seconds

    return timer(0, pollInterval).pipe(
      switchMap((): Promise<{ documents: Array<any> }> => {
        return this.database.listDocuments(
          environment.appwrite_DatabaseID,
          environment.post_CollectionID,
          [
            Query.orderDesc('$createdAt')
          ]
        );
      }),
      map((response: { documents: Array<any> }) => {
        response.documents.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        return response;
      })
    );
  }


  getBlogPosts(): Observable<{ documents: Array<any> }> {
    const pollInterval = 60000; // 60 seconds

    return timer(0, pollInterval).pipe(
      switchMap((): Promise<{ documents: Array<any> }> => {
        return this.database.listDocuments(
          environment.appwrite_DatabaseID,
          environment.blogpost_CollectionID,
          [
            Query.orderDesc('$createdAt')
          ]
        );
      }),
      // map((response: { documents: Array<any> }) => {
      //   response.documents.sort((a, b) => {
      //     const dateA = new Date(a.createdAt).getTime();
      //     const dateB = new Date(b.createdAt).getTime();
      //     return dateB - dateA;
      //   });
      //   return response;
      // })
    );
  }




}
