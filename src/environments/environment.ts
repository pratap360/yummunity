// environment.ts
// export const environment = {
//   production: false,
//   appwriteUrl: String(process.env["APPWRITE_URL"]),
//   appwriteProjectId: String(process.env["APPWRITE_PROJECT_ID"]),
//   appwriteDatabaseId: String(process.env["APPWRITE_DATABASE_ID"]),
//   appwriteCollectionId: String(process.env["APPWRITE_COLLECTION_ID"]),
//   appwriteBucketId: String(process.env["APPWRITE_BUCKET_ID"]),
// };

// environment.ts old one 👇
// export const environment = {
//   production: false,
//   appwrite_Endpoint: 'https://cloud.appwrite.io/v1', 
//   appwrite_ProjectID: 'yummunity', 
//   appwrite_DatabaseID:'yummunity-data',
//   appwrite_BucketID_PostImages:'PostImages',
//   appwrite_BucketID_profile_pictures:'6706c76000374f4b5f76',
//   users_CollectionID:'users',
//   post_CollectionID: 'posts' ,
//   blogpost_CollectionID: 'blog_post',
  
// };

// new one 👇

export const environment = {
  production: false,
  appwrite_Endpoint: 'https://cloud.appwrite.io/v1', 
  appwrite_ProjectID: 'yummunity', 
  appwrite_DatabaseID:'yummunity-data',

  post_CollectionID: 'posts',
  comments_CollectionID: 'comments',
  users_CollectionID:'users',
  blogpost_CollectionID: 'blog_post',

  PostImages_BucketID:'PostImages',
  Profile_pictures_BucketID:'profile_pictures',
  Blog_thumbnail_BucketID:'Blog_thumbnail',
};