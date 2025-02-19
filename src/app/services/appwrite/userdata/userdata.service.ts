import { Injectable } from '@angular/core';
import { Account, Client, Databases, Storage, ID } from 'appwrite';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import appwriteService from '../../../../lib/appwrite/config';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  // Store user data that needs to be shared
  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  constructor() {}

  // Store initial signup data
  setSignupData(data: { user_name: string; user_email: string; user_password: string }) {
    this.userData.next(data);
  }

  // Get stored signup data
  getSignupData() {
    return this.userData.getValue();
  }

}
// async uploadProfilePic(files: File[]):Promise<string[]>{
//   const uploadedUrls: string[] = [];
//   try {
//     for (const file of files){
//       const uploadedFile = await this.storage.createFile(
//          environment.Profile_pictures_BucketID,
//             ID.unique(),
//             file
//       );
//       uploadedUrls.push(uploadedFile.$id);
//     }
//     return uploadedUrls
//   } catch (error) {
//     console.error('Error uploading files:', error);
//     throw error;
//   }
// }


  // Create user in Appwrite
//   async createUser(signupData: any, welcomeData: any) {
//     try {
//       // Create user account
//       const account = await this.account.create(
//         ID.unique(),
//         signupData.user_email,
//         signupData.user_password,
//         signupData.user_name
//       );
//       console.log('New User Created:',account);
      
//       Upload profile picture if provided
//       let profilePicUrl = [];
//       if (welcomeData.user_profile_pic instanceof File) {
//         try {
//           const file = await this.storage.createFile(
//             environment.Profile_pictures_BucketID,
//             ID.unique(),
//             welcomeData.user_profile_pic
//           );
//         profilePicUrl.push(file.$id);
//         }
//         catch(error){
//           console.log(" Uploading error form userData service file:", error);
          
//         }
//       }

//       const combinedUserData = {
//       user_id: account.$id,
//       user_name: signupData.user_name,
//       user_email: signupData.user_email,
//       user_tag: welcomeData.user_tag,
//       user_bio: welcomeData.user_bio,
//       user_profile_pic: welcomeData.user_profile_pic,
//       user_phone_no: welcomeData.user_phone_no,
//       user_gender: welcomeData.user_gender,
//       user_dob: welcomeData.user_dob,
//       user_location: welcomeData.user_location,
//       user_url: welcomeData.user_url,
//       user_fav_food_recipe: welcomeData.user_fav_food_recipe
//       };

//       // Store user data in database
//       await this.databases.createDocument(
//         environment.appwrite_DatabaseID,
//         environment.users_CollectionID,
//         ID.unique(),
//         combinedUserData
//       );

//       return { success: true, userData: combinedUserData };
//     } catch (error) {
//       console.error('Error creating user:', error);
//       return { success: false, error };
//     }
//   }
// }