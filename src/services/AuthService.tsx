import { LoginSchema } from "@/schemas/AuthSchema"
import { z } from "zod"
import { apiClient } from "@/configs/axios"

const loginService = async (data: z.infer<typeof LoginSchema>, onError:any) => {
  try {
    const response = await apiClient.post("/v1/login", data)

    return response
  } catch (error: any) {
    onError(error.response)
    return null
  }
}
export { loginService }