import { apiClient } from "@/configs/axios";
import { Comment, CommentPaginationResponse } from "@/models/Comment";

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

export const getCommentService = async (postId: number, page: number): Promise<CommentPaginationResponse> => {
  const response = await apiClient.get(`/v1/comments/${postId}`, {
    params: {
      page: page
    }
  });

  return response.data
}

export const getCommentChildService = async (parentId: number, page: number): Promise<CommentPaginationResponse> => {
  const response = await apiClient.get(`/v1/comments/replies/${parentId}`, {
    params: {
      page: page
    }
  });

  return response.data
}