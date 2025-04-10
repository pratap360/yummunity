import { Injectable,signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Client, Databases } from 'appwrite';
import { RecipePost } from '../../interface/recipe-post';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications = signal<any[]>([]);
  badgeCount = signal<number>(0);

  private client: Client;
  private databases: Databases;
  
  
  constructor() {
    // Initialize Appwrite client first
    this.client = new Client()
      .setEndpoint(environment.appwrite_Endpoint)
      .setProject(environment.appwrite_ProjectID);
    
    // Then initialize Databases
    this.databases = new Databases(this.client);
    this.initNotifications();
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
  
      const processed = this.processPosts(response.documents as unknown as RecipePost[]);
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
      (response: any) => {
        if(response.events.includes('database.documents.update')) {
          const updated = this.processPosts([response.payload as RecipePost]);
          this.notifications.update(prev => [...updated, ...prev]); // Corrected spread operator usage
          this.badgeCount.update(prev => prev + updated.length);
        }
      }
    );
  }


private processPosts(posts: RecipePost[]): any {
  return posts.flatMap(post => {
    const interactions = [];
    if(post.post_whoLiked?.length) {
      interactions.push(...this.createNotifications(post, 'likes', post.post_whoLiked));
    }
    if(post.post_whoSaved?.length) {
      interactions.push(...this.createNotifications(post, 'saves', post.post_whoSaved));
    }
    if(post.post_whoComments?.length){
      interactions.push(...this.createNotifications(post, 'comments', post.post_whoComments));
    }
    return interactions;
  });
}
  
// private createNotifications(post: any, action: string, users: any[]): any[] {
//   return users.map(user => ({
//     type: action,
//     user: typeof user === 'string' ? { name: user } : user,
//     post,
//     createdAt: new Date().toISOString(),
//     postUrl: `user/${post.user_tag}/post/${post.$id}`,
//     thumbnail: post.post_Content_Pictures?.[0],
//     userTag: post.user_tag
//   }))
// }

private createNotifications(post: any, action: string, users: any[]): any[] {
  return users.map(user => {
    let userData;
    let commentText = '';
    
    if (typeof user === 'string') {
      userData = { name: user };
    } else if (action === 'comments' && user.comment) {
      userData = { name: user.user_name || user.name };
      commentText = user.comment;
    } else {
      userData = user;
    }
    
    return {
      type: action === 'likes' ? 'liked' : 
            action === 'saves' ? 'saved' : 
            action === 'comments' ? 'commented' : action,
      user: userData,
      comment: commentText,
      post,
      // createdAt: user.timestamp || post.timestamp || new Date().toISOString(),
      createdAt: post.$updatedAt || post.$createdAt || new Date().toISOString(),
      postUrl: `/user/${post.user_tag}/post/${post.$id}`,
      thumbnail: post.post_Content_Pictures?.[0],
      // thumbnail: post.post_Content_Pictures?.[0] || post.post_Content,
      userTag: post.user_tag
    };
  });
}


}
