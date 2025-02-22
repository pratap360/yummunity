# Yummunity = Yummy Food 🍲 + Community 🤝

Yummunity is a dynamic and engaging food-based social media platform that allows users to share recipes, explore food content, and interact with a vibrant community of food enthusiasts. Built with Angular 18 and Appwrite, the project aims to provide a seamless and interactive experience for sharing culinary ideas.

`note: this is still under Devlopment Phrase`<br>

## 🚀 Project Overview
Yummunity offers a platform for food lovers to:
- Share recipes and food-related posts.
- Explore random food images using Pexel Photo API.
- Interact through likes, comments, and saved posts.
- Experience a user-friendly UI with Angular Material.

## 🛠️ Tech Stack
- **Frontend:** Angular 18
- **Backend:** Appwrite for custom API and data operations
- **Styling:** Angular Material
- **Markdown Rendering:** ngx-markdown
- **Image API:** Pexel Photo API
- **Responsive Design:** Flex Layout and Angular Material components

## 📦 Features Implemented
1. **Recipe Posting:**
   - Three types of posts: `text-post`, `with-img-post`, and `blog-post`.
   - Markdown support for blog posts.
   - Emoji, poll, and rating options.

2. **Navigation and UI:**
   - Responsive side navigation using `mat-sidenav` and `mat-nav-list`.
   - Dynamic search bar centered like ChatGPT’s interface.
   - Custom 404 error page with random background images.

3. **Interactions:**
   - Like and save buttons with dynamic color change.
   - Commenting system with relative timestamp display (e.g., '2 hours ago').
   - Modal pop-up for comments with scroll support for large comment lists.

4. **Data Management:**
   - Integration with Appwrite for fetching and posting data.
   - AppwriteService for seamless backend interactions.

5. **Additional Functionalities:**
   - Export tables to Excel with multi-tab selection.
   - Markdown preview support using `ngx-markdown`.
   - Image preview before upload.

## 📁 Project Structure (⚠ will update later)
```
Yummunity/
├─ src/
│   ├─ app/
│   |- assets/
│   |- components/
│   |- environments/
│   |- libs/
|   |- index.html
|   |- main.ts
│   └─ styles.css
└─ README.md
```

## 🚀 Getting Started
### Prerequisites
- Node.js
- Angular CLI

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/yummunity.git

# Navigate to the project directory
cd yummunity

# Install dependencies
npm install

# Run the application
ng serve
```

## 🔗 APIs Used
- **Pexel Photo API:** To fetch random food images for the login page.
- **Appwrite:** Custom APIs for data management.

## 📄 Markdown Support
Yummunity uses `ngx-markdown` for rendering markdown content in blog posts. This allows users to write posts in markdown format and preview them in real-time.

## 📸 Screenshots 
⚠ will update later

## 🚧 Roadmap
- Add more post formats.
- Enhance the commenting system.
- Implement advanced search and filter options.

## 🤝 Contributing
Feel free to contribute to Yummunity by opening issues or submitting pull requests!

## 📝 License
This project is licensed under the MIT License.

---

Made with ❤️ by [Pratap Parui](https://portfolio.paruidev.com)
