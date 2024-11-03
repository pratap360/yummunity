import { Client, Account, ID } from 'appwrite';
// import { AppwriteConfigService } from '../AppwriteConfig';

export class AuthService {
  client = new Client();
  account: any;

  constructor() {
    // this.client
    //   .setEndpoint(AppwriteConfigService.appwriteConfig.appwriteUrl)
    //   .setProject(AppwriteConfigService.appwriteConfig.appwriteProjectId);
    // this.account = new Account(this.client);

    this.client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('670194640036c325ba3a');
    this.account = new Account(this.client);
  }

  async signup({ user_name, email, password }: { user_name: string, email: string, password: string }) {
    try {
       const userAccount = await this.account.create(ID.unique(),user_name, email, password)
       if (userAccount) {
         return this.login({email, password})        
       } else {
        return userAccount      
       }
    } catch (error) {
        throw error
    }
  }

  async login({email, password}: {email: string, password: string}) {
    try {
        return await this.account.createEmailSession(email, password)
    } catch (error) {
        throw error
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get()
    } catch (error) {
        console.log("Appwrite Service :: getCurrentUser()", error);
    }
    return null
  }

  async logout() {
    try {
        await this.account.deleteSessions()
    } catch (error) {
        console.log("Appwrite Service :: logout()", error);
    }
  }
}


const authService = new AuthService();

export default authService