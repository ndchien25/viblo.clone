import { apiClient } from "@/configs/axios"

const searchTagService = async (query: string, onError: any) => {
    try {
        const response = await apiClient.get("/v1/tags/search", {params: {query}})
        return response
    } catch (error: any) {
        onError(error?.response)
        return null
    }
}

export { searchTagService }