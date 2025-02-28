// appwrite.service.ts

import { Injectable } from '@angular/core';
import {
  Client,
  Account,
  Databases,
  Storage,
  ID,
  Query,
  Permission,
  Role,
} from 'appwrite';
import { environment } from '../environments/environment';
import { from, Observable, of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserData } from '../app/interface/user-data';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { RecipePost } from '../app/interface/recipe-post';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  // private sdk: Client;
  client = new Client();
  database: any;
  storage: any;
  account: any;
  session: any;

  constructor() {
    this.client
      .setEndpoint(environment.appwrite_Endpoint)
      .setProject(environment.appwrite_ProjectID);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
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
        environment.PostImages_BucketID,
        ID.unique(),
        file
      )
    );

    return Promise.all(uploadPromises).then((responses) =>
      responses.map((response) =>
        this.storage.getFileView(environment.PostImages_BucketID, response.$id)
      )
    );
  }

  uploadBlogFiles(files: File[]): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.storage.createFile(
        environment.Blog_thumbnail_BucketID,
        ID.unique(),
        file
      )
    );

    return Promise.all(uploadPromises).then((responses) =>
      responses.map((response) =>
        this.storage.getFileView(
          environment.Blog_thumbnail_BucketID,
          response.$id
        )
      )
    );
  }
  uploadProfilePic(files: File[]): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.storage.createFile(
        environment.Profile_pictures_BucketID,
        ID.unique(),
        file
      )
    );

    return Promise.all(uploadPromises).then((responses) =>
      responses.map((response) =>
        this.storage.getFileView(
          environment.Profile_pictures_BucketID,
          response.$id
        )
      )
    );
  }

  // ! updateProfilePic method bana hai baki

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

  // home feed -> recipte posts data fetching for text posts+image posts
  getAllPosts(
    limit: number,
    offset: number
  ): Observable<{ documents: Array<any> }> {
    const pollInterval = 300000; // 60 seconds X 5 = 5 minutes

    return timer(0, pollInterval).pipe(
      switchMap((): Promise<{ documents: Array<any> }> => {
        return this.database.listDocuments(
          environment.appwrite_DatabaseID,
          environment.post_CollectionID,
          [
            Query.orderDesc('$createdAt'),
            Query.limit(limit),
            Query.offset(offset),
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

  // home feed -> recipte posts data fetching for blogs
  getBlogPosts(): Observable<{ documents: Array<any> }> {
    const pollInterval = 300000; // 60 seconds X 5 => 300000 = 5 minutes

    return timer(0, pollInterval).pipe(
      switchMap((): Promise<{ documents: Array<any> }> => {
        return this.database.listDocuments(
          environment.appwrite_DatabaseID,
          environment.blogpost_CollectionID,
          [Query.orderDesc('$createdAt')]
        );
      })
    );
  }

  // account page data fetching
  getUserPosts(): Observable<{ documents: Array<any> }> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        [Query.orderDesc('$createdAt')]
      ) as Promise<{ documents: Array<any> }>
    );
  }

  // getPostById(postId: string): Observable<any> {
  //   return from(
  //     this.database.getDocument(
  //     environment.appwrite_DatabaseID,
  //     environment.post_CollectionID,
  //     postId
  //     )
  //   );
  // }

  getPostById(documentId: string): Observable<any> {
    return from(
      this.database.getDocument(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        documentId
      )
    );
  }

  createNewUser(data: any): Observable<any> {
    return this.database.createDocument(
      environment.appwrite_DatabaseID,
      environment.users_CollectionID,
      ID.unique(),
      data
    );
  }

  async createAccount(email: string, password: string, name: string) {
    return await this.account.create(ID.unique(), email, password, name);
  }

  async createUserDocument(userId: string, userData: any) {
    return await this.database.createDocument(
      environment.appwrite_DatabaseID,
      environment.users_CollectionID,
      userId,
      userData,
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        // Permission.update(Role.user(userId)),
      ]
    );
  }

  // 👇 current session user data method
  getCurrentUser(): Observable<UserData> {
    return from(this.account.get()).pipe(
      switchMap((session: any) => {
        return this.getUserData(session.$id);
      })
    );
  }

  getUserData(userId: string): Observable<UserData> {
    return from(
      this.database.getDocument(
        environment.appwrite_DatabaseID,
        environment.users_CollectionID,
        userId
      ) as Promise<UserData>
    );
  }

  // updateUserData(userId: string, userData: any): Observable<any> {
  //   return this.database.updateDocument(
  //     environment.appwrite_DatabaseID,
  //     environment.users_CollectionID,
  //     userId,
  //     userData
  //   );
  // }

  updateUserData(userId: string, userData: any): Observable<any> {
    // Check if there's a new profile pic to upload
    if (userData.user_profile_pic instanceof File) {
      // Step 1: Upload the new image
      return from(
        this.storage.createFile(
          environment.Profile_pictures_BucketID,
          ID.unique(),
          userData.user_profile_pic
        )
      ).pipe(
        switchMap((fileRespone: any) => {
          const newPicUrl = fileRespone.$id;

          // Step 2: Get the user's current document to check for an existing profile pic
          return from(
            this.database.getDocument(
              environment.appwrite_DatabaseID,
              environment.users_CollectionID,
              userId
            )
          ).pipe(
            switchMap((userDoc: any) => {
              const oldPic = userDoc.user_profile_pic;
              if (oldPic) {
                // Delete the old profile pic if it exists
                return from(
                  this.storage.deleteFile(
                    environment.Profile_pictures_BucketID,
                    oldPic
                  )
                ).pipe(map(() => newPicUrl));
              } else {
                return of(newPicUrl);
              }
            })
          );
        }),
        // Step 3: Update the user document with the new profile pic URL
        switchMap((newPicUrl: string) => {
          // Update the userData object with the new profile pic URL
          userData.user_profile_pic = newPicUrl;
          return this.database.updateDocument(
            environment.appwrite_DatabaseID,
            environment.users_CollectionID,
            userId,
            userData
          );
        })
      );
    } else {
      // If no new profile pic, just update other user data
      return this.database.updateDocument(
        environment.appwrite_DatabaseID,
        environment.users_CollectionID,
        userId,
        userData
      );
    }
  }

  getFullPost(postId: string): Observable<any> {
    return from(
      this.database.getDocument(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        postId
      )
    ) as Observable<RecipePost>;
  }
}
