import { Injectable } from '@angular/core';
import { Account, Client, Databases, Storage, ID } from 'appwrite';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private client = new Client();
  private account: Account;
  private databases: Databases;
  private storage: Storage;
  
  // Store user data that needs to be shared
  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  constructor() {
    this.client
      .setEndpoint(environment.appwrite_Endpoint)
      .setProject(environment.appwrite_ProjectID);
    
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Store initial signup data
  setSignupData(data: { user_name: string; user_email: string; user_password: string }) {
    this.userData.next(data);
  }

  // Get stored signup data
  getSignupData() {
    return this.userData.getValue();
  }

  // Create user in Appwrite
  async createUser(signupData: any, welcomeData: any) {
    try {
      // Create user account
      const account = await this.account.create(
        ID.unique(),
        signupData.user_email,
        signupData.user_password,
        signupData.user_name
      );

      // Upload profile picture if provided
      let profilePicUrl = '';
      if (welcomeData.user_profile_pic instanceof File) {
        try {
          const file = await this.storage.createFile(
            environment.Profile_pictures_BucketID,
            ID.unique(),
            welcomeData.user_profile_pic
          );
        profilePicUrl = file.$id;
        }
        catch(error){
          console.log(" Uploading error form userData service file:", error);
          
        }
      }

      // Combine all user data
      const combinedUserData = {
        user_id: account.$id,
        user_name: signupData.user_name,
        user_email: signupData.user_email,
        user_tag: welcomeData.user_tag,
        user_bio: welcomeData.user_bio,
        user_profile_pic: profilePicUrl,
        user_phone_no: welcomeData.user_phone_no,
        user_gender: welcomeData.user_gender,
        user_dob: welcomeData.user_dob,
        user_location: welcomeData.user_location,
        user_url: welcomeData.user_url,
        user_fav_food_recipe: welcomeData.user_fav_food_recipe
      };

      // Store user data in database
      await this.databases.createDocument(
        environment.appwrite_DatabaseID,
        environment.users_CollectionID,
        ID.unique(),
        combinedUserData
      );

      return { success: true, userData: combinedUserData };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error };
    }
  }
}