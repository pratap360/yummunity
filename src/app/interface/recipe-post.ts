export interface RecipePost {
  // documentId: string;
  id: string;
  createdAt?: string;
  users: {
    user_tag: string;
    user_profile_pic?: string;
    user_name: string;
    user_bio?: string;
  }[];
  user_name: string | null;
  user_bio?: string | null;
  user_tag: string | null;
  post_Content_Pictures: any[];
  post_Content: string;
  post_likes: number;
  post_comments?: number;
  post_saves: number;
}
