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
import { from, Observable, of, throwError, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserData } from '../app/interface/user-data';
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

  // // ! save post api logic is here for both posts and blog posts working condition
  // toggleSavedPost(post: any, user_tag: string): Observable<any> {
  //   if (!post || (!post.id && !post.$id)) {
  //     console.error('Post is missing ID:', post);
  //     return of(null);
  //   }

  //   const postId = post.id || post.$id;
  //   // Determine if it's a blog post by checking for blog-specific fields
  //   const isBlogPost =
  //     post.blog_post_title !== undefined ||
  //     post.blog_post_whoSaved !== undefined;
  //   const collectionId = isBlogPost
  //     ? environment.blogpost_CollectionID
  //     : environment.post_CollectionID;

  //   console.log('Saving post type:', isBlogPost ? 'Blog Post' : 'Recipe Post');
  //   console.log('Post ID:', postId);

  //   // Determine which fields to use based on post type
  //   const whoSavedField = isBlogPost ? 'blog_post_whoSaved' : 'post_whoSaved';
  //   const savesField = isBlogPost ? 'blog_post_saves' : 'post_saves';

  //   // Get existing saved array and count
  //   const savedArray = post[whoSavedField] || [];
  //   const isSaved = savedArray.includes(user_tag);
  //   let updatedSavedArray = [...savedArray];
  //   let newSaveCount = post[savesField] || 0;

  //   // Update saved array
  //   if (isSaved) {
  //     updatedSavedArray = updatedSavedArray.filter((tag) => tag !== user_tag);
  //     newSaveCount = Math.max(0, newSaveCount - 1);
  //   } else {
  //     updatedSavedArray.push(user_tag);
  //     newSaveCount += 1;
  //   }

  //   // Create update object
  //   const updateData: any = {};
  //   updateData[whoSavedField] = updatedSavedArray;
  //   updateData[savesField] = newSaveCount;

  //   console.log('Updating document with:', updateData);

  //   // Perform update
  //   return from(
  //     this.database.updateDocument(
  //       environment.appwrite_DatabaseID,
  //       collectionId,
  //       postId,
  //       updateData
  //     )
  //   );
  // }

  // ! two separte method for  post and blog post for saving and unsave
  toggleSavePost(post: any, user_tag: string): Observable<any> {
    if (!post || (!post.id && !post.$id)) {
      console.error('Post is missing ID:', post);
      return of(null);
    }

    const postId = post.id || post.$id;

    // Check if it's a blog post
    const isBlogPost =
      post.blog_post_title !== undefined ||
      post.blog_post_whoSaved !== undefined;

    // Route to the appropriate method based on post type
    if (isBlogPost) {
      return this.toggleSaveBlog(post, user_tag);
    } else {
      // Regular post handling
      const whoSavedField = 'post_whoSaved';
      const savesField = 'post_saves';

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

      console.log('Updating recipe post document with:', updateData);

      // Perform update
      return from(
        this.database.updateDocument(
          environment.appwrite_DatabaseID,
          environment.post_CollectionID,
          postId,
          updateData
        )
      );
    }
  }

  toggleSaveBlog(blogpost: any, user_tag: string): Observable<any> {
    if (!blogpost || (!blogpost.id && !blogpost.$id)) {
      console.error('Blog post is missing ID:', blogpost);
      return of(null);
    }

    const blogPostId = blogpost.id || blogpost.$id;
    const whoSavedField = 'blog_post_whoSaved';
    const savesField = 'blog_post_saves';

    // Get existing saved array and count
    const savedArray = blogpost[whoSavedField] || [];
    const isSaved = savedArray.includes(user_tag);
    let updatedSavedArray = [...savedArray];
    let newSaveCount = blogpost[savesField] || 0;

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

    console.log('Updating blog post document with:', updateData);

    // Perform update
    return from(
      this.database.updateDocument(
        environment.appwrite_DatabaseID,
        environment.blogpost_CollectionID,
        blogPostId,
        updateData
      )
    ).pipe(
      catchError((error) => {
        console.error('Error updating blog post:', error);
        return of(null);
      })
    );
  }

  isPostSavedByUser(post: any, user_tag: string): boolean {
    if (!post || !user_tag) return false;
    // Check if it's a blog post or a recipe post
    if (post.blog_post_title) {
      return (post.blog_post_whoSaved || []).includes(user_tag);
    } else {
      return (post.post_whoSaved || []).includes(user_tag);
    }
  }

  getPostById(documentId: string): Observable<any> {
    return from(
      this.database.getDocument(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        documentId
      )
    );
  }
  getBlogPostById(documentId: string): Observable<any> {
    return from(
      this.database.getDocument(
        environment.appwrite_DatabaseID,
        environment.blogpost_CollectionID,
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
// 
  // updateUserData(userId: string, userData: any): Observable<any> {
  //   // Check if there's a new profile pic to upload
  //   if (userData.user_profile_pic instanceof File) {
  //     // Step 1: Upload the new image
  //     return from(
  //       this.storage.createFile(
  //         environment.Profile_pictures_BucketID,
  //         ID.unique(),
  //         userData.user_profile_pic
  //       )
  //     ).pipe(
  //       switchMap((fileRespone: any) => {
  //         const newPicUrl = fileRespone.$id;

  //         // Step 2: Get the user's current document to check for an existing profile pic
  //         return from(
  //           this.database.getDocument(
  //             environment.appwrite_DatabaseID,
  //             environment.users_CollectionID,
  //             userId
  //           )
  //         ).pipe(
  //           switchMap((userDoc: any) => {
  //             const oldPic = userDoc.user_profile_pic;
  //             if (oldPic) {
  //               // Delete the old profile pic if it exists
  //               return from(
  //                 this.storage.deleteFile(
  //                   environment.Profile_pictures_BucketID,
  //                   oldPic
  //                 )
  //               ).pipe(map(() => newPicUrl));
  //             } else {
  //               return of(newPicUrl);
  //             }
  //           })
  //         );
  //       }),
  //       // Step 3: Update the user document with the new profile pic URL
  //       switchMap((newPicUrl: string) => {
  //         // Update the userData object with the new profile pic URL
  //         userData.user_profile_pic = newPicUrl;
  //         return from (
  //           this.database.updateDocument(
  //             environment.appwrite_DatabaseID,
  //             environment.users_CollectionID,
  //             userId,
  //             userData
  //           )
  //         );
  //       })
  //     );
  //   } else {
  //     // If no new profile pic, just update other user data
  //     return from (
  //       this.database.updateDocument(
  //       environment.appwrite_DatabaseID,
  //       environment.users_CollectionID,
  //       userId,
  //       userData
  //     )
  //   );
  //   }
  // }

  updateUserData(userId: string, userData: any): Observable<any> {
    // Create a copy of userData to avoid modifying the original
    const userDataToUpdate = { ...userData };
    
    // Check if there's a new profile pic to upload (it's a File object)
    if (userData.user_profile_pic instanceof File) {
      // Step 1: Upload the new image
      return from(
        this.uploadProfilePic([userData.user_profile_pic])
      ).pipe(
        switchMap((fileUrls: string[]) => {
          if (fileUrls && fileUrls.length > 0) {
            // Set the user_profile_pic to the file ID from the URL
            // Extract the file ID from the URL or use the complete URL
            const fileUrl = fileUrls[0];
            
            // Update the userDataToUpdate object with the file ID
            userDataToUpdate.user_profile_pic = fileUrl;
            
            // Step 2: Update the user document with the new profile pic URL
            return this.database.updateDocument(
              environment.appwrite_DatabaseID,
              environment.users_CollectionID,
              userId,
              userDataToUpdate
            );
          } else {
            return throwError(() => new Error('Failed to upload profile picture'));
          }
        })
      );
    } else {
      // If no new profile pic or it's already a string, just update other user data
      return from(
        this.database.updateDocument(
          environment.appwrite_DatabaseID,
          environment.users_CollectionID,
          userId,
          userDataToUpdate
        )
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

  toggleLikePost(post: any, user_tag: string): Observable<any> {
    if (!post || (!post.id && !post.$id)) {
      console.error('Post is missing ID:', post);
      return of(null);
    }

    const postId = post.id || post.$id;
    const isBlogPost =
      post.blog_post_title !== undefined ||
      post.blog_post_whoLiked !== undefined;

    // Route to the appropriate method based on post type
    if (isBlogPost) {
      return this.toggleLikeBlog(post, user_tag);
    } else {
      // Regular post handling
      const whoLikedField = 'post_whoLiked';
      const likesField = 'post_likes';

      // Get existing liked array and count
      const likedArray = post[whoLikedField] || [];
      const isLiked = likedArray.includes(user_tag);
      let updatedLikedArray = [...likedArray];
      let newLikeCount = post[likesField] || 0;

      // Update liked array
      if (isLiked) {
        updatedLikedArray = updatedLikedArray.filter((tag) => tag !== user_tag);
        newLikeCount = Math.max(0, newLikeCount - 1);
      } else {
        updatedLikedArray.push(user_tag);
        newLikeCount += 1;
      }

      // Create update object
      const updateData: any = {};
      updateData[whoLikedField] = updatedLikedArray;
      updateData[likesField] = newLikeCount;

      console.log('Updating recipe post document with:', updateData);

      // Perform update
      return from(
        this.database.updateDocument(
          environment.appwrite_DatabaseID,
          environment.post_CollectionID,
          postId,
          updateData
        )
      );
    }
  }

  toggleLikeBlog(blogpost: any, user_tag: string): Observable<any> {
    if (!blogpost || (!blogpost.id && !blogpost.$id)) {
      console.error('Blog post is missing ID:', blogpost);
      return of(null);
    }

    const blogPostId = blogpost.id || blogpost.$id;
    const whoLikedField = 'blog_post_whoLiked';
    const likesField = 'blog_post_likes';

    // Get existing liked array and count
    const likedArray = blogpost[whoLikedField] || [];
    const isLiked = likedArray.includes(user_tag);
    let updatedLikedArray = [...likedArray];
    let newLikeCount = blogpost[likesField] || 0;

    // Update liked array
    if (isLiked) {
      updatedLikedArray = updatedLikedArray.filter((tag) => tag !== user_tag);
      newLikeCount = Math.max(0, newLikeCount - 1);
    } else {
      updatedLikedArray.push(user_tag);
      newLikeCount += 1;
    }

    // Create update object
    const updateData: any = {};
    updateData[whoLikedField] = updatedLikedArray;
    updateData[likesField] = newLikeCount;

    console.log('Updating blog post document with:', updateData);
    // Perform update
    return from(
      this.database.updateDocument(
        environment.appwrite_DatabaseID,
        environment.blogpost_CollectionID,
        blogPostId,
        updateData
      )
    ).pipe(
      catchError((error) => {
        console.error('Error updating blog post:', error);
        return of(null);
      })
    );
  }

  isPostLikedByUser(post: any, user_tag: string): boolean {
    if (!post || !user_tag) return false;
    // Check if it's a blog post or a recipe post
    if (post.blog_post_title) {
      return (post.blog_post_whoLiked || []).includes(user_tag);
    } else {
      return (post.post_whoLiked || []).includes(user_tag);
    }
  }

  // ! adding comments to the post and blog post featuere is here. 

addComment(postId: string, commentObj: any) {
  return new Observable<any>((observer) => {
    // First get the existing post data
    this.getPostById(postId).subscribe({
      next: (postData) => {
        // Initialize comments array if it doesn't exist
        const currentComments = Array.isArray(postData.post_whoComments) 
          ? postData.post_whoComments 
          : [];
        
        const updatedComments = [commentObj, ...currentComments];
        
        // Update the post with the new comments array
        this.database
          .updateDocument(
            environment.appwrite_DatabaseID,
            environment.post_CollectionID,
            postId,
            {
              post_whoComments: updatedComments,
              post_comments: updatedComments.length,
            }
          )
          .then((response: any) => {
            // On success, parse the comments back to objects for the UI
            if (response.post_whoComments) {
              response.post_whoComments = response.post_whoComments.map(
                (comment: string) => {
                  try {
                    return JSON.parse(comment);
                  } catch (e) {
                    return comment; // Keep as is if it's not JSON
                  }
                }
              );
            }
            observer.next(response);
            observer.complete();
          })
          .catch((error: any) => {
            observer.error(error);
          });
      },
      error: (error) => {
        observer.error(error);
      }
    });
  });
}
addBlogComment(blogpostId: string, commentObj: any){
  return new Observable<any>((observer) => {
    // First get the existing post data
    this.getBlogPostById(blogpostId).subscribe({
      next: (blogPostData) => {
        // Initialize comments array if it doesn't exist
        const currentComments = Array.isArray(blogPostData.blog_post_whoComments) 
          ? blogPostData.blog_post_whoComments 
          : [];
        
        const updatedComments = [commentObj, ...currentComments];
        
        // Update the post with the new comments array
        this.database
          .updateDocument(
            environment.appwrite_DatabaseID,
            environment.blogpost_CollectionID,
            blogpostId,
            {
              blog_post_whoComments: updatedComments,
              blog_post_comments: updatedComments.length,
            }
          )
          .then((response: any) => {
            // On success, parse the comments back to objects for the UI
            if (response.blog_post_whoComments) {
              response.blog_post_whoComments = response.blog_post_whoComments.map(
                (comment: string) => {
                  try {
                    return JSON.parse(comment);
                  } catch (e) {
                    return comment; // Keep as is if it's not JSON
                  }
                }
              );
            }
            observer.next(response);
            observer.complete();
          })
          .catch((error: any) => {
            observer.error(error);
          });
      },
      error: (error) => {
        observer.error(error);
      }
    });
  });
}




}