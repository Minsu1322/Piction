export interface Post {
  id: number;
  created_at: string;
  user_id: string;
  title: string;
  content: string;
  comment_count: string;
}

export interface Comment {
  id: number;
  community_id: number;
  user_id: string;
  comment_content: string;
  created_at: string;
  anonymous_name: number;
}
