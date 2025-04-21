
# Yummunity

Yummunity = Yummy Food 🍲 + Community 🤝


![Logo](/src/assets/readme%20img/yummunity%20placehoder.png)

Yummunity is a dynamic and engaging food-based social media platform that allows users to share recipes, explore food content, and interact with a vibrant community of food enthusiasts. Built with Angular 18 and Appwrite, the project aims to provide a seamless and interactive experience for sharing culinary ideas.


## Badges


[![made with angular](https://img.shields.io/badge/made_with_angular-purple?style=for-the-badge&logo=angular)](https://angular.dev/)
![appwrite](https://img.shields.io/badge/appwrite-pink?style=for-the-badge&logo=appwrite)
[![typescript](https://img.shields.io/badge/typescript-white?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![GCP](https://img.shields.io/badge/GCP-cloud%20Run-20B2AA?style=for-the-badge&logo=googlecloud)](https://cloud.google.com/)
[![Apache License](https://img.shields.io/badge/License-Apache-blue?style=for-the-badge)](https://cloud.google.com/)

[![Yummunity – Launch on Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=954360&theme=light&t=1744994363531)](https://www.producthunt.com/posts/yummunity-beta-version?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-yummunity&#0045;beta&#0045;version)


## Screenshots

### Mobile
![App Screenshot](/src/assets/readme%20img/mobile%20render.jpg)

### Desktop
![Desktop Screenshot](/src/assets/readme%20img/Desktop%20render%201.jpg)
![Desktop Screenshot](/src/assets/readme%20img/Desktop%20render%202.jpg)

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | Angular 18, TypeScript, Angular Material, HTML , CSS |
| **Backend** | Node js, Appwrite |
| Storage | Appwrite bucket Storage |
| **Auth** | Google oauth and Basic Auth |
| **Hosting** | Google Cloud Run & Vercel |
| **Others** | Angular CLI, RxJs, Ngx Markdown, TheMealDB, **Pexel Photo API** |

## Features

- User Authentication (via email or google auth)
- Community Recipes Posts & Blog post sharing
- Like, Comment, Save and Share functionality
- User Account page
- Responsive design
- Recipe finder though search
- post notification implementation


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Environment Variables

Kindly replace all the id's from your accont written in **CAPITALS LETTERS** over here and make sure don't change any keyword names.

If you have any doubt you can check out the offical documentation from the Appwrite [ Documentation](https://appwrite.io/docs)

```env
# Appwrite Setup  [DEV setup]
export const environment = {
  production: false,
  appwrite_Endpoint: 'https://cloud.appwrite.io/v1',
  appwrite_ProjectID: 'YOUR-PROJECT-ID',
  appwrite_DatabaseID: 'YOUR-DATABASE-ID',

  users_CollectionID: 'YOUR-COLLECTION-ID',
  post_CollectionID: 'YOUR-POST-COLLECTION-ID',
  blogpost_CollectionID: 'YOUR-BLOGPOST-COLLECTION-ID',

  all_Images_BucketID: 'YOUR-POSTIMAGES-BUCKET-ID',
  all_Images_BucketID: 'YOUR-PROFILE-PICTURES-BUCKET-ID',
  all_Images_BucketID: 'YOUR-BLOG-THUMBNAIL-BUCKET-ID',

    # not mandatory
  Unsplash_AccessKey: 'YOUR-UNSPLASH_ACCESSKEY',
};

```
Similarly you have create another file for production environoments 

```env
# Appwrite Setup  [PROD setup]
export const environment = {
  production: true,
  appwrite_Endpoint: 'https://cloud.appwrite.io/v1',
  appwrite_ProjectID: 'YOUR-PROJECT-ID',
  appwrite_DatabaseID: 'YOUR-DATABASE-ID',

  users_CollectionID: 'YOUR-COLLECTION-ID',
  post_CollectionID: 'YOUR-POST-COLLECTION-ID',
  blogpost_CollectionID: 'YOUR-BLOGPOST-COLLECTION-ID',

  all_Images_BucketID: 'YOUR-POSTIMAGES-BUCKET-ID',
  all_Images_BucketID: 'YOUR-PROFILE-PICTURES-BUCKET-ID',
  all_Images_BucketID: 'YOUR-BLOG-THUMBNAIL-BUCKET-ID',

    # not mandatory
  Unsplash_AccessKey: 'YOUR-UNSPLASH_ACCESSKEY',
};

```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-7003E9?style=for-the-badge&logo=devbox&logoColor=white)](https://portfolio.paruidev.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/pratap-parui)
[![twitter](https://img.shields.io/badge/twitter-000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/parui_pratap)
[![biolink](https://img.shields.io/badge/biolink-222?style=for-the-badge&logo=biolink&logoColor=white)](https://pratapparui.bio.link/)

## Appendix

Do Check out my In Depth Guide for this project [Click here to check](https://paruidev.com)
