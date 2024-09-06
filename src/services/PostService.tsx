import { apiClient } from "@/configs/axios"
import { PostCreate } from "@/schemas/PostSchema"

const createPostService = async (data: PostCreate, onError: any) => {
    try {
        const response = await apiClient.post("/v1/post", data)
        return response
    } catch (error: any) {
        onError(error?.response)
        return null
    }
}

export { createPostService }