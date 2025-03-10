export interface RecipePost {
  // documentId: string;
  id: string;
  createdAt?: string;
  users: any[];
  user_name: string | null;
  user_bio?: string | null;
  user_tag: string | null;
  user_profile_pic?: string;
  post_Content_Pictures: any[];
  post_Content: string;
  post_likes: number;
  post_comments?: number;
  post_saves: number;
}
