export interface RecipePost {
  // documentId: string;
  id?: string;
  createdAt?: string;
  users?: string | null;
  user_name: string | null;
  user_bio?: string | null;
  post_Content_Pictures: any[];
  post_Content: string;
  post_likes: number;
  post_comments?: number;
  post_saves: number;
}
