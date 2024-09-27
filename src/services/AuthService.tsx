import { ForgotSchema, LoginSchema, RegisterSchema, ResetPasswordSchema } from "@/schemas/AuthSchema"
import { AxiosResponse } from 'axios';
import { z } from "zod"
import { apiClient } from "@/configs/axios"
export const loginService = async (data: z.infer<typeof LoginSchema>): Promise<any> => {
  const response = await apiClient.post("/v1/login", data)
  return response.data;
};

export const registerService = async (data: z.infer<typeof RegisterSchema>): Promise<AxiosResponse<any>> => {
  const response = await apiClient.post("/v1/register", data)
  return response
}

export const resendVerificationEmailService = async (data: any): Promise<AxiosResponse<any>> => {
  const response = await apiClient.post("/v1/email/verify/resend", data)
  return response
}

export const forgotPasswordService = async (data: z.infer<typeof ForgotSchema>): Promise<AxiosResponse<any>> => {
  const response = await apiClient.post("/v1/forgot-password", data)
  return response
}

export const resetPasswordService = async (data: z.infer<typeof ResetPasswordSchema> & { email: string; token: string }): Promise<AxiosResponse<any>> => {
  const response = await apiClient.post("/v1/reset-password", {...data})
  return response
}

export const authCheck = async (onError: any) => {
  try {
    const respone = await apiClient.get('/v1/me');
    return respone
  } catch (error: any) {
    onError(error?.respone)
    return null
  }
}

export const logout = async () => {
  const respone = await apiClient.post('/v1/logout');
  return respone
}
