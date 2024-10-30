import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteConfigService {
  appwriteConfig = {
    appwriteUrl: environment.appwriteUrl,
    appwriteProjectId: environment.appwriteProjectId,
    appwriteDatabaseId: environment.appwriteDatabaseId,
    appwriteCollectionId: environment.appwriteCollectionId,
    appwriteBucketId: environment.appwriteBucketId,
  };
}

export default AppwriteConfigService;
