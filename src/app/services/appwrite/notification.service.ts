import { inject, Injectable,signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Client, Databases } from 'appwrite';
import { RecipePost } from '../../interface/recipe-post';
import { AppwriteService } from '../../../lib/appwrite.service';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications = signal<any[]>([]);
  badgeCount = signal<number>(0);

  private client: Client;
  private databases: Databases;
  currentUser: string = ''; 
  private appwriteService = inject(AppwriteService);
  
  constructor() {
    // Initialize Appwrite client first
    this.client = new Client()
      .setEndpoint(environment.appwrite_Endpoint)
      .setProject(environment.appwrite_ProjectID);
    
    // Then initialize Databases
    this.databases = new Databases(this.client);
    // this.initNotifications();
    this.getCurrentUser().then(() => {
      this.initNotifications();
    });
  }


  async getCurrentUser() {
    try {
      const userData = await firstValueFrom(this.appwriteService.getCurrentUser());
      this.currentUser = userData.user_tag || '';
      console.log('Current User:', this.currentUser);
      return this.currentUser;
    } catch (error) {
      console.error('Error getting current user for notifications:', error);
      return '';
    }
  }

  async initNotifications() {
    try {
      if (!environment.appwrite_DatabaseID || !environment.post_CollectionID) {
        throw new Error('Appwrite database configuration is missing');
      }
  
      const response = await this.databases.listDocuments(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID
      );
  
      const processed = await this.processPosts(response.documents as unknown as RecipePost[]);
      this.notifications.set(processed); // Fixed indentation
      this.badgeCount.set(processed.length); // Fixed indentation
  
      this.setupRealtimeUpdates();
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }
  
  private setupRealtimeUpdates() {
    this.client.subscribe(
      `databases.${environment.appwrite_DatabaseID}.collections.${environment.post_CollectionID}.documents`,
      async (response: any) => {
        if(response.events.includes('database.documents.update')) {
          const updated = await this.processPosts([response.payload as RecipePost]);
          this.notifications.update(prev => [...updated, ...prev]); // Corrected spread operator usage
          this.badgeCount.update(prev => prev + updated.length);
        }
      }
    );
  }


private processPosts(posts: RecipePost[]): any {
  return posts
    // Only include posts that belong to the current user
    .filter(post => post.user_tag === this.currentUser)
    .flatMap(post => {
      const interactions = [];
      
      // Process likes (exclude self-likes)
      if(post.post_whoLiked?.length) {
        const nonSelfLikes = post.post_whoLiked.filter((user: { name?: string; user_name?: string } | string) => 
          typeof user === 'string' 
            ? user !== this.currentUser
            : user.name !== this.currentUser && user.user_name !== this.currentUser
        );
        
        if (nonSelfLikes.length > 0) {
          interactions.push(...this.createNotifications(post, 'likes', nonSelfLikes));
        }
      }
      
      // Process saves (exclude self-saves)
      if(post.post_whoSaved?.length) {
        const nonSelfSaves = post.post_whoSaved.filter((user: { name?: string; user_name?: string } | string) => 
          typeof user === 'string' 
            ? user !== this.currentUser
            : user.name !== this.currentUser && user.user_name !== this.currentUser
        );
        
        if (nonSelfSaves.length > 0) {
          interactions.push(...this.createNotifications(post, 'saves', nonSelfSaves));
        }
      }

      console.log('post_whoComments structure:', post.post_whoComments);
      
      // Process comments (exclude self-comments)
      if(post.post_whoComments && Array.isArray(post.post_whoComments)&& post.post_whoComments.length > 0) {

        const commentsArray = post.post_whoComments.map((item:any) => {
          if(typeof item === 'string' && item.startsWith('{')) {
            try {
              return JSON.parse(item);
            } catch (error) {
              console.error('Error parsing JSON string:', error);
              return item;
            }
          }
          return item;
        })

        const nonSelfComments = commentsArray.filter((comment: any) => {
          const commentUserTag = typeof comment === 'string'?comment: comment.user_tag|| comment.user_name || (comment.user_id && comment.user_id.toString());
          return commentUserTag && commentUserTag !== this.currentUser;
        })
    
        console.log('nonSelfComments:', nonSelfComments);
        
        if(nonSelfComments.length > 0 ){
          interactions.push(...this.createNotifications(post, 'comments', nonSelfComments));
        }
      }
      return interactions;

        // const notSelfComments = commentsProcessed.filter((user:any)=> {
        //   typeof user === 'string' ? user !== this.currentUser : (user.user_tag !== this.currentUser && user.user_name !== this.currentUser && user.comment !== this.currentUser);
        // })

        // if(notSelfComments.length > 0){
        //   interactions.push(...this.createNotifications(post, 'comments', notSelfComments));
        // }


        // !! this below code is returning json obj
      //   const nonSelfComments = post.post_whoComments.filter((user: { user_tag?: string; user_name?: string; comment?: string } | string) => 
      //     typeof user === 'string' 
      //       ? user !== this.currentUser
      //       : user.user_tag !== this.currentUser && user.user_name !== this.currentUser
      //   );
        
      //   if (nonSelfComments.length > 0) {
      //     interactions.push(...this.createNotifications(post, 'comments', nonSelfComments));
      //   }
      // }
      
      // return interactions;
    });
}

private createNotifications(post: any, action: string, users: any[]): any[] {
  return users.map(user => {
    // Debug the user object to see structure
    console.log(`Creating ${action} notification with user:`, user);

    // Don't create notifications for the post owner's own actions
    if ((typeof user === 'string' && user === post.user_tag) ||
        (user.user_tag && user.user_tag === post.user_tag)) {
      return null;
    }

    let userData: any = { name: 'Unknown User' };
    let commentText = '';
    
    if (typeof user === 'string') {
      userData = { name: user, user_tag: user };
    } else if (action === 'comments') {
      // For comment notifications, extract user data and comment text
      userData = { 
        name: user.user_name || user.name || user.user_tag || 'Anonymous',
        user_tag: user.user_tag || user.user_name || user.name
      };
      
      // Extract comment text from various possible locations
      commentText = user.comment || 
                   (typeof user.comment === 'object' ? JSON.stringify(user.comment) : '') ||
                   '';
                   
      console.log('Extracted comment text:', commentText);
    } else {
      userData = { 
        name: user.user_name || user.name || 'Anonymous',
        user_tag: user.user_tag || user.user_name || user.name
      };
    }
    
    return {
      type: action === 'likes' ? 'liked' : 
            action === 'saves' ? 'saved' : 
            action === 'comments' ? 'commented' : action,
      user: userData,
      comment: commentText,
      post,
      createdAt: post.$updatedAt || post.$createdAt || new Date().toISOString(),
      postUrl: `/user/${post.user_tag}/post/${post.$id}`,
      thumbnail: post.post_Content_Pictures?.[0],
      userTag: post.user_tag
    };
  }).filter(notification => notification !== null);
}

// private async processPosts(posts: RecipePost[]): Promise<any> {
//   return posts.flatMap(post => {
//     const interactions = [];
//     if(post.post_whoLiked?.length) {
//       interactions.push(...this.createNotifications(post, 'likes', post.post_whoLiked));
//     }
//     if(post.post_whoSaved?.length) {
//       interactions.push(...this.createNotifications(post, 'saves', post.post_whoSaved));
//     }
//     if(post.post_whoComments?.length){
//       interactions.push(...this.createNotifications(post, 'comments', post.post_whoComments));
//     }
//     return interactions;
//   });
// }

// private createNotifications(post: any, action: string, users: any[]): any[] {
//   return users.map(user => {
//     const isPostOwner = typeof user === 'string'
//       ? user === post.user_tag
//       : (user.user_tag || user.user_name) === post.user_tag;

//       if(isPostOwner) {
//         return null; // Skip notifications for the post owner
//       }

//     let userData;
//     let commentText = '';
//     let userTag = '';
    
//     if (typeof user === 'string') {
//       userData = { name: user };
//       userTag = user;
//     } else if (action === 'comments') {
//       userData = { name: user.user_name || user.name };
//       commentText = user.comment || '';
//       userTag = user.user_tag || user.user_name;
//     } else {
//       userData = { name: user.user_name || user.name || 'Anonymous User' };
//       userTag = user.user_tag || user.user_name;
//     }
    
//     return {
//       type: action === 'likes' ? 'liked' : 
//             action === 'saves' ? 'saved' : 
//             action === 'comments' ? 'commented' : action,
//       user: {
//         ...userData,
//         user_tag: userTag
//       },
//       comment: commentText,
//       post,
//       createdAt: post.$updatedAt || post.$createdAt || new Date().toISOString(),
//       postUrl: `/user/${post.user_tag}/post/${post.$id}`,
//       thumbnail: post.post_Content_Pictures?.[0],
//       userTag: post.user_tag
//     };
//   }).filter(notification => notification !== null);
// }


}
