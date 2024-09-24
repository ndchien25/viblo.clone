import { apiClient } from "@/configs/axios"
import { User } from "@/models/User"

export interface UserResponse {
  data: User[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export const getAllUserService = async (page: number, pageSize: number): Promise<UserResponse> => {
  const response = await apiClient.get(`/v1/admin/user`, {
    params: {
      page: page,
      limit: pageSize
    }
  })
  return response.data
}
