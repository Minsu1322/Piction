export interface Post {
  id: number;
  created_at: string;
  user_id: string;
  title: string;
  content: string;
  comment_count: number;
  likes_count: number;
  hasLiked: boolean;
}

export interface Comment {
  id: number;
  community_id: number;
  user_id: string;
  comment_content: string;
  created_at: string;
  anonymous_name: number;
}
