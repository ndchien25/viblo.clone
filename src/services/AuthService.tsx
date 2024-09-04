import { LoginSchema, RegisterSchema } from "@/schemas/AuthSchema"
import { z } from "zod"
import { apiClient } from "@/configs/axios"

const loginService = async (data: z.infer<typeof LoginSchema>, onError: any) => {
  try {
    const response = await apiClient.post("/v1/login", data)
    return response
  } catch (error: any) {
    onError(error?.response)
    return null
  }
}

const registerService = async (data: z.infer<typeof RegisterSchema>, onError: any) => {
  try {
    const response = await apiClient.post("/v1/register", data)
    return response
  } catch (error: any) {
    onError(error?.response)
    return null
  }
}

const resendVerificationEmailService = async (data: any, onError: any) => {
  try {
    const response = await apiClient.post("/v1/email/verify/resend", data)
    return response
  } catch (error: any) {
    onError(error?.response)
    return null
  }
}

const forgotPasswordService = async (data: any, onError: any) => {
  try {
    const response = await apiClient.post("/v1/forgot-password", data)
    return response
  } catch (error: any) {
    onError(error?.response)
    return null
  }
}
export { loginService, registerService, resendVerificationEmailService, forgotPasswordService }