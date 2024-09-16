import { User } from "./User";

export type Comment = {
  id: number;
  user_id: number;
  post_id: number;
  type: 'post' | 'question';
  content: string;
  parent_id: number | null;
  row_count: number;
  created_at?: Date;
  updated_at?: Date;
  user: User;
};
