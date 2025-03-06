import { Injectable } from '@angular/core';
import { Account, Client, Databases, ID, Query } from 'appwrite';
import { environment } from '../../../../environments/environment';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OnSearchGetUserService {
  client = new Client();
  database: any;
  account: any;

  constructor() {
    this.client
      .setEndpoint(environment.appwrite_Endpoint)
      .setProject(environment.appwrite_ProjectID);
    this.database = new Databases(this.client);
    this.account = new Account(this.client);
  }

  getUsersOnSearch(): Observable<{ documents: Array<any> }> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.users_CollectionID,
        [Query.orderDesc('$createdAt'), Query.limit(5)]
      ) as Promise<{ documents: Array<any> }>
    );
  }

  getUserProfile(user_tag: string): Observable<any> {
    return from(
      this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.users_CollectionID,
        [Query.equal('user_tag', user_tag)]
      )
    );
  }

  async getUserByTag(user_tag: string): Promise<any> {
    try {
      const response = await this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.users_CollectionID,
        [Query.equal('user_tag', [user_tag])]
      );
      return response.documents[0]; // Return the first matching user
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async getPostsByUserName(user_name: string): Promise<any> {
    try {
      const res = await this.database.listDocuments(
        environment.appwrite_DatabaseID,
        environment.post_CollectionID,
        [Query.equal('creator', user_name)]
      );
    } catch (error) {
      console.error('Error in fetching user on -> getUserByName()::', error);
      return null;
    }
  }
}
