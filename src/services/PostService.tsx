import { apiClient } from "@/configs/axios"
import { Post } from "@/models/Post"
import { PostCreate } from "@/schemas/PostSchema"

const createPostService = async (data: PostCreate, onError: any) => {
    try {
        const response = await apiClient.post("/v1/posts", data)
        return response
    } catch (error: any) {
        onError(error?.response)
        return null
    }
}

const getPostBySlugService = async(slug: string, onError: any) => {
    try {
        const response = await apiClient.get<Post>(`/v1/posts/${slug}`)
        return response.data
    } catch(error: any) {
        onError(error?.response)
        return null
    }
}
export { createPostService, getPostBySlugService }