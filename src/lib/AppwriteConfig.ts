import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteConfigService {
  static appwriteConfig: any;
  appwriteConfig = {
    appwriteUrl: environment.appwrite_Endpoint,
    appwriteProjectId: environment.appwrite_Endpoint,
    appwriteDatabaseId: environment.appwrite_DatabaseID,
    // appwriteCollectionId: environment.appwriteCollectionId,
    // appwriteBucketId: environment.appwriteBucketId,
  };
}

export default AppwriteConfigService;
