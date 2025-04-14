## 📬 Contributing to Yummunity

Thank you for your interest in contributing to **Yummunity**! 🎉  
Whether you're fixing a bug, improving documentation, or adding new features, your help is highly appreciated.

Please follow the guidelines below to make the contribution process smooth and collaborative.

---

### 📁 Project Setup Guide

> Make sure you have Node.js and Git installed.

1. **Fork the Repository**  
   Click the `Fork` button on the top right of the [Yummunity GitHub repo](https://github.com/pratap360/yummunity) to create your own copy.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/yummunity.git
   cd yummunity
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**  
   Replace a `src/environments` files and create appwrite account i have provided the guide below.[Appwrite Setup (Short Tutorial)](#appwrite-setup)


5. **Run the App Locally**
   ```bash
   ng serve
   ```

6. Visit `http://localhost:4200` to see the app running locally.

---

### 🛠️ How to Contribute

> Choose any of the following ways to contribute:

#### ✅ 1. Report Bugs
- Open a GitHub Issue
- Use a descriptive title and clearly explain the issue

#### 🚀 2. Suggest Features or Enhancements
- Create an Issue with `[Feature]` or `[Suggestion]` in the title
- Describe what you’d like to see and how it improves the project

#### 🧑‍💻 3. Submit Code Contributions

**Step-by-step:**
```bash
# Create a new branch for your changes
git checkout -b feature/your-branch-name

# Make your changes and commit
git add .
git commit -m "Add: meaningful message about your changes"

# Push your branch
git push branch-name feature/your-branch-name
```

- Create a **Pull Request** from your forked repo
- Explain what changes you made and why
- Link any related issue if applicable

---

### ✅ Best Practices

- Follow the existing **code style**
- Test your changes before submitting
- Keep commits clean and atomic
- Use clear and descriptive commit messages

---

### 🤛 Need Help?

Feel free to open an issue or Dm me directly on Discord if you're unsure about anything!

---
## Appwrite Setup


### 🌐 A. Appwrite Cloud (Recommended)
You can also use [Appwrite Cloud](https://cloud.appwrite.io/) just sign up and create a new project.

---

### 🔧 B. Install Appwrite (Optional)
You can run Appwrite using Docker.

```bash
docker run -it --rm \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume "$(pwd)"/appwrite:/appwrite:rw \
  appwrite/appwrite:latest install
```

Once installed, visit: [http://localhost](http://localhost)

---

### 📁 C. Create a Project & Set Up DB

1. Go to the **Appwrite console**
2. Click **Create Project** → Name it (e.g., `Yummunity`)
3. Inside the project:
   - Go to **Database** → Create a **Database**
   - Inside the database, create a **Collection** (e.g., `recipes`)
   - Add attributes (fields) like `title`, `description`, `imageUrl`, `userId`
4. Do check the all interface for the `Collections and Attributes` you have to create in appwrite.
---

### 📂 D. Set Up Storage (for Image Uploads)

1. Go to **Storage** → Create a new **Bucket**
   - Enable "File previews" if needed
2. Name the bucket (e.g., `recipe-images`)
3. Copy the **Bucket ID** and add it to `environments.ts` file

---

### 🔑 E. Generate API Key

1. Go to **API Keys** in project settings
2. Create a key with access to:
   - **Database**
   - **Storage**
   - **Users**
3. Copy the API Key and paste it into your `environments.ts` file

---


## 📅 Environment files Changes
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

  PostImages_BucketID: 'YOUR-POSTIMAGES-BUCKET-ID',
  Profile_pictures_BucketID: 'YOUR-PROFILE-PICTURES-BUCKET-ID',
  Blog_thumbnail_BucketID: 'YOUR-BLOG-THUMBNAIL-BUCKET-ID',

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

  PostImages_BucketID: 'YOUR-POSTIMAGES-BUCKET-ID',
  Profile_pictures_BucketID: 'YOUR-PROFILE-PICTURES-BUCKET-ID',
  Blog_thumbnail_BucketID: 'YOUR-BLOG-THUMBNAIL-BUCKET-ID',

    # not mandatory
  Unsplash_AccessKey: 'YOUR-UNSPLASH_ACCESSKEY',
};

```
---


## 🔗 Connect Appwrite to Yummunity (Code Tip)

Install Appwrite SDK:
```bash
npm install appwrite
```

Example setup in a utility file (`lib/appwrite.js`):
```js
import { Client, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
```

Then you can use it like this:
```js
// Create a recipe document
await databases.createDocument(
  process.env.APPWRITE_DATABASE_ID,
  process.env.APPWRITE_COLLECTION_ID,
  'unique()',
  {
    title: 'Delicious Pasta',
    description: 'Step-by-step recipe...',
    imageUrl: 'https://...',
    userId: 'current_user_id'
  }
);
```

---

Feel free to open a PR if you want to help improve the Appwrite integration too! 🚀

