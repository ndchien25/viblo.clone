import { apiClient } from "@/configs/axios";
import { Tag } from "@/models/Tag";

export const searchTagService = async (search: string): Promise<Tag[] | null> => {
    const response = await apiClient.get("/v1/tags/search", { params: { search } });
    return response.data;
};
