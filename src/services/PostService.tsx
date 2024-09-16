import { apiClient } from "@/configs/axios";
import { Post } from "@/models/Post";
import { PostCreate } from "@/schemas/PostSchema";

interface PostData {
    post: Post | null;
    user_vote: 'up' | 'down' | null;
  }
export const createPostService = async (data: PostCreate) => {
    const response = await apiClient.post("/v1/posts", data);
    return response.data;
};

export const getPostBySlugService = async (slug: string): Promise<PostData | null> => {
    const response = await apiClient.get(`/v1/posts/${slug}`);
    return response.data;
};

type VoteType = 'up' | 'down' | 'none';

export const votePostService = async (postId: number, vote: VoteType): Promise<void> => {
    await apiClient.post(`/v1/posts/${postId}/vote`, { vote });
};
