import { retry } from 'rxjs';
import { AppwriteConfigService } from '../AppwriteConfig';
import { Client, Databases, Storage, Query, ID } from 'appwrite';

export class AppwriteService {
  client = new Client();
  database: any;
  storage: any;
  // queries = [Query.equal("status", "active")]
  constructor() {
    this.client
      .setEndpoint(AppwriteConfigService.appwriteConfig.appwriteUrl)
      .setProject(AppwriteConfigService.appwriteConfig.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async getPost(slug: any) {
    try {
      return await this.database.getDocument(
        AppwriteConfigService.appwriteConfig.appwriteDatabaseId,
        AppwriteConfigService.appwriteConfig.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite Service :: getPost() ::', error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.database.listDocuments(
        AppwriteConfigService.appwriteConfig.appwriteDatabaseId,
        AppwriteConfigService.appwriteConfig.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log('Appwrite Service :: getPosts() ::', error);
      // return false;
    }
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: any) {
    try {
      return await this.database.createDocument(
        AppwriteConfigService.appwriteConfig.appwriteDatabaseId,
        AppwriteConfigService.appwriteConfig.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log('Appwrite Service :: createPost() ::', error);
      // return false;
    }
  }

  async updatePost(slug: any, { title, content, featuredImage, status }: any) {
    try {
      return await this.database.updateDocument(
        AppwriteConfigService.appwriteConfig.appwriteDatabaseId,
        AppwriteConfigService.appwriteConfig.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log('Appwrite Service :: updatePost() ::', error);
      // return false;
    }
  }

  async deletePost(slug: any) {
    try {
      await this.database.deleteDocument(
        AppwriteConfigService.appwriteConfig.appwriteDatabaseId,
        AppwriteConfigService.appwriteConfig.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log('Appwrite Service :: deletePost() ::', error);
      return false;
    }
  }

  //   storage service start here

  async uploadFile(file: any) {
    try {
      return await this.storage.createFile(
        AppwriteConfigService.appwriteConfig.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite Service :: uploadFile() ::', error);
      // return false;
    }
  }

  async deleteFile(fileId: any) {
    try {
      await this.storage.deleteFile(
        AppwriteConfigService.appwriteConfig.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.log('Appwrite Service :: deleteFile() ::', error);
      return false;
    }
  }

  getFilePreview(fileId: any) {
    return this.storage.getFilePreview(
      AppwriteConfigService.appwriteConfig.appwriteBucketId,
      fileId
    ).href;
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
