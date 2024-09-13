import { apiClient } from "@/configs/axios";

type VoteType = 'up' | 'down' | 'none';

const votePostService = async (postId: string, vote: VoteType, onError: (error: any) => void) => {
  try {
    const response = await apiClient.post(`/v1/posts/${postId}/vote`, { vote });
    return response;
  } catch (error: any) {
    onError(error?.response || error);
    return null;
  }
}

export { votePostService };
