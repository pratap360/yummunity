export interface BlogPost {
  id?: string;
  createdAt?: string;
  users?: string | null;
  user_name: string | null;
  user_bio?: string | null;
  user_tag?: string | null;
  user_profile_pic?: string | null;
  blog_post_title: string;
  blog_post_summary: string;
  blog_post_tags: string[];
  blog_post_link: string;
  blog_post_thumbnail: any[];
  blog_post_likes: number;
  blog_post_whoLiked?: string[];
  blog_post_comments?: number;
  blog_post_saves: number;
  blog_post_whoSaved?: string[];
}
