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
import { switchMap, map, catchError } from 'rxjs/operators';
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

  // createPost(data: any) {
  //   return this.database.createDocument(
  //     environment.appwrite_DatabaseID,
  //     environment.post_CollectionID,
  //     ID.unique(),
  //     data
  //   );
  // }
  createPost(postData: RecipePost): Promise<any> {
    return this.database.createDocument(
      environment.appwrite_DatabaseID,
      environment.post_CollectionID,
      ID.unique(),
      postData
    );
  }

  createBlogPost(blogData: any): Promise<any> {
    return this.database.createDocument(
      environment.appwrite_DatabaseID,
      environment.blogpost_CollectionID,
      ID.unique(),
      blogData
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
  getUserPosts(user_tag: string): Observable<{ documents: Array<any> }> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        [Query.orderDesc('$createdAt'), Query.equal('user_tag', user_tag)]
      ) as Promise<{ documents: Array<any> }>
    );
  }

  // Add this to appwrite.service.ts
  getUserBlogPosts(user_tag: string): Observable<{ documents: Array<any> }> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.blogpost_CollectionID,
        [Query.orderDesc('$createdAt'), Query.equal('user_tag', user_tag)]
      ) as Promise<{ documents: Array<any> }>
    );
  }

  // ! save post api logic is here
  // * 👇 the below method return all the post which is created by the user it working but not correctly
  getUserSavedPosts(user_tag: string): Observable<{ documents: Array<any> }> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        [Query.orderDesc('$createdAt'), Query.search('post_whoSaved', user_tag)]
      ) as Promise<{ documents: Array<any> }>
    );
  }
  getUserBlogSavedPosts(
    user_tag: string
  ): Observable<{ documents: Array<any> }> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.blogpost_CollectionID,
        [
          Query.orderDesc('$createdAt'),
          Query.search('blog_post_whoSaved', user_tag),
        ]
      ) as Promise<{ documents: Array<any> }>
    );
  }

  // ! save post api logic is here
  toogleSavePost(post: any, user_tag: string): Observable<any> {
    if (!post || (!post.id && !post.$id)) {
      console.error('Post is missing ID:', post);
      return of(null);
    }

    const postId = post.id || post.$id;
    // Determine if it's a blog post by checking for blog-specific fields
    const isBlogPost =
      post.blog_post_title !== undefined ||
      post.blog_post_whoSaved !== undefined;
    const collectionId = isBlogPost
      ? environment.blogpost_CollectionID
      : environment.post_CollectionID;

    console.log('Saving post type:', isBlogPost ? 'Blog Post' : 'Recipe Post');
    console.log('Post ID:', postId);

    // Determine which fields to use based on post type
    const whoSavedField = isBlogPost ? 'blog_post_whoSaved' : 'post_whoSaved';
    const savesField = isBlogPost ? 'blog_post_saves' : 'post_saves';

    // Get existing saved array and count
    const savedArray = post[whoSavedField] || [];
    const isSaved = savedArray.includes(user_tag);
    let updatedSavedArray = [...savedArray];
    let newSaveCount = post[savesField] || 0;

    // Update saved array
    if (isSaved) {
      updatedSavedArray = updatedSavedArray.filter((tag) => tag !== user_tag);
      newSaveCount = Math.max(0, newSaveCount - 1);
    } else {
      updatedSavedArray.push(user_tag);
      newSaveCount += 1;
    }

    // Create update object
    const updateData: any = {};
    updateData[whoSavedField] = updatedSavedArray;
    updateData[savesField] = newSaveCount;

    console.log('Updating document with:', updateData);

    // Perform update
    return from(
      this.database.updateDocument(
        environment.appwrite_DatabaseID,
        collectionId,
        postId,
        updateData
      )
    );
  }

  isPostSavedByUser(post: any, userId: string): boolean {
    // Check if the post has savedBy array
    const savedBy = post.savedBy || post.blog_post_savedBy || [];
    return savedBy.includes(userId);
  }
  // isPostSavedByUser(post: any, user_tag: string): boolean {
  //   if (!post) return false;

  //   // Check if it's a blog post or a recipe post
  //   if (post.blog_post_title) {
  //     return (post.blog_post_whoSaved || []).includes(user_tag);
  //   } else {
  //     return (post.post_whoSaved || []).includes(user_tag);
  //   }
  // }

  // getUserSavedPosts(user_tag: string): Observable<any> {
  //   // Get saved recipe posts
  //   const savedRecipePosts = from(
  //     this.database
  //       .listDocuments(
  //         environment.appwrite_DatabaseID,
  //         environment.post_CollectionID,
  //         [
  //           Query.orderDesc('$createdAt'),
  //           Query.contains('post_whoSaved', [user_tag]),
  //         ]
  //       )
  //       .pipe(
  //         catchError((error) => {
  //           console.error('Error fetching saved recipes:', error);
  //           return of({ documents: [] });
  //         })
  //       )
  //   );

  //   // Get saved blog posts
  //   const savedBlogPosts = from(
  //     this.database
  //       .listDocuments(
  //         environment.appwrite_DatabaseID,
  //         environment.blogpost_CollectionID,
  //         [
  //           Query.orderDesc('$createdAt'),
  //           Query.contains('blog_post_whoSaved', [user_tag]),
  //         ]
  //       )
  //       .pipe(
  //         catchError((error) => {
  //           console.error('Error fetching saved recipes:', error);
  //           return of({ documents: [] });
  //         })
  //       )
  //   );

  //   // Combine both results
  //   return savedRecipePosts.pipe(
  //     switchMap((recipePosts: any) => {
  //       return savedBlogPosts.pipe(
  //         map((blogPosts: any) => {
  //           const combinedResults = {
  //             documents: [...recipePosts.documents, ...blogPosts.documents],
  //           };
  //           return combinedResults;
  //         })
  //       );
  //     })
  //   );
  // }

  // getUserSavedPosts(user_tag: string): Observable<any> {
  //   // const savedRecipesPost = from(
  //   return from(
  //     this.database
  //       .listDocuments(
  //         environment.appwrite_DatabaseID,
  //         environment.post_CollectionID,
  //         [
  //           Query.orderDesc('$createdAt'),
  //           // Query.equal('post_whoSaved', [user_tag]),
  //           Query.contains('post_whoSaved', [user_tag]),
  //         ]
  //       )
  //       .pipe(
  //         catchError((error) => {
  //           console.error('Error fetching saved recipes:', error);
  //           return of({ documents: [] });
  //         })
  //       )
  //   );

  //   // const savedBlogsPost = from(
  //   //   this.database.listDocuments(
  //   //     environment.appwrite_DatabaseID,
  //   //     environment.blogpost_CollectionID,
  //   //     [
  //   //       Query.orderDesc('$createdAt'),
  //   //       Query.search('blog_post_whoSaved', user_tag),
  //   //     ]
  //   //   ).pipe(
  //   //     catchError(error => {
  //   //       console.error('Error fetching saved blogs Post:', error);
  //   //       return of({ documents: [] });
  //   //     })
  //   //   )
  //   // );

  //   // return savedRecipesPost.pipe(
  //   //   switchMap((recipePosts: any) => {
  //   //     return savedBlogsPost.pipe(
  //   //       map((blogPosts: any) => {
  //   //         return [...recipePosts.documents, ...blogPosts.documents];
  //   //       })
  //   //     );
  //   //   })
  //   // );
  // }

  // async getUserPosts(userId: string) {
  //   try {
  //     const response = await this.database.listDocuments(
  //       environment.appwrite_DatabaseID,
  //       environment.post_CollectionID,
  //       [Query.equal('creator', userId)]
  //     );
  //     return response.documents;
  //   } catch (error) {
  //     console.error('Appwrite service :: getUserPosts :: error', error);
  //     return [];
  //   }
  // }

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

  async getCurrentUserId(): Promise<string | null> {
    try {
      const session = await this.account.get();
      return session.$id;
    } catch (error) {
      console.error('User not logged in');
      return null;
    }
  }

  // async updateLikes(postId: string, likes: number, likedBy: string[]) {
  async updateLikes(postId: string, likes: number) {
    try {
      await this.database.updateDocument(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        postId,
        {
          likes: likes,
          // likedBy: likedBy
        }
      );
    } catch (error) {
      console.error('Error updating likes:', error);
    }
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

  getSavedPosts(userId: string, postId: string): Observable<any> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.savespost_CollectionID,
        [Query.equal('user_id', userId), Query.equal('post_id', postId)]
      )
    ).pipe(
      map((response: any) => {
        return response.documents;
      })
    ) as Observable<any>;
  }

  savePost(
    userId: string,
    postId: string,
    postType: string = 'text'
  ): Observable<any> {
    const saveData = {
      user_id: userId,
      post_id: postId,
      post_type: postType,
      // saved_date: new Date().toISOString()
    };
    return this.database.createDocument(
      environment.appwrite_DatabaseID,
      environment.savespost_CollectionID,
      ID.unique(),
      saveData
    );
  }

  async removeSavedPost(userId: string, postId: string): Promise<void> {
    try {
      // First get the saved post document
      const response = await this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.savespost_CollectionID,
        [Query.equal('user_id', userId), Query.equal('post_id', postId)]
      );

      const documents = response.documents;
      if (documents.length > 0) {
        const documentId = documents[0].$id;
        await this.database.deleteDocument(
          environment.appwrite_DatabaseID,
          environment.savespost_CollectionID,
          documentId
        );
      }
    } catch (error) {
      console.error('Error removing saved post:', error);
    }
  }

  // async removeSavedPost(userId: string, postId: string) {
  //   const docs = await this.getSavedPosts(userId, postId).toPromise();
  //   if (docs.documents.length) {
  //     return await this.database.deleteDocument(
  //       environment.appwrite_DatabaseID,
  //       environment.savespost_CollectionID,
  //       docs[0].$id
  //     );
  //   }
  // }

  async getUserSavedPost(userId: string) {
    return await this.database.listDocuments(
      environment.appwrite_DatabaseID,
      environment.savespost_CollectionID,
      [Query.equal('user_id', userId)]
    );
  }
}
