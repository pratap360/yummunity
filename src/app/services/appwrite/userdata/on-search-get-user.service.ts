import { Injectable } from '@angular/core';
import { Account, Client, Databases,  ID, Query } from 'appwrite';
import { environment } from '../../../../environments/environment';
import { from,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
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
          [
            Query.orderDesc('$createdAt'),
            Query.limit(5)
          ]
        ) as Promise<{ documents: Array<any> }>
      );
    }
  
}
