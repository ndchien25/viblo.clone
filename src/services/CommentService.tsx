import { apiClient } from "@/configs/axios";
import { Comment } from "@/models/Comment";

interface CommentCreate {
  post_id: number;
  content: string;
  type: 'question' | 'post';
  parent_id: number | null;
}

export const createCommentService = async (data: CommentCreate): Promise<Comment> => {
  const response = await apiClient.post("/v1/comments", data);
  return response.data;
};

export const getCommentService = async (): Promise<Comment[]> => {
  const response = await apiClient.get("/v1/comments");
  return response.data
}