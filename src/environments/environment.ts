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
  appwrite_DatabaseID: 'yummunity-data',

  users_CollectionID: 'users',
  post_CollectionID: 'posts',
  blogpost_CollectionID: 'blog_post',

  PostImages_BucketID: 'PostImages',
  Profile_pictures_BucketID: 'profile_pictures',
  Blog_thumbnail_BucketID: 'Blog_thumbnail',

  Unsplash_AccessKey: '3z5xa34vOyd7SLK-AtnvNX0FmnVt2Pw8fcAXRJBOMDo',
};

// export const environment = {
//   production: false,
//   appwrite_Endpoint: process.env['APPWRITE_URL'] || '',
//   appwrite_ProjectID: process.env['APPWRITE_PROJECT_ID'] || '',
//   appwrite_DatabaseID: process.env['APPWRITE_DATABASE_ID'] || '',

//   post_CollectionID: process.env['APPWRITE_POST_COLLECTION_ID'] || '',
//   comments_CollectionID: process.env['APPWRITE_COMMENT_COLLECTION_ID'] || '',
//   users_CollectionID: process.env['APPWRITE_USER_COLLECTION_ID'] || '',
//   blogpost_CollectionID: process.env['APPWRITE_BLOGPOST_COLLECTION_ID'] || '',

//   PostImages_BucketID: process.env['APPWRITE_POST_IMAGE_BUCKET_ID'] || '',
//   Profile_pictures_BucketID: process.env['APPWRITE_PROFILE_PICTURE_BUCKET_ID'] || '',
//   Blog_thumbnail_BucketID: process.env['APPWRITE_BLOG_THUMBNAIL_BUCKET_ID'] || '',
// };
