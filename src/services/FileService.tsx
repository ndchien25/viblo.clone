import { apiClient } from "@/configs/axios";

export const uploadService = async (file_name: string): Promise<{pre_signed: string, file_path: string}> => {
  const response = await apiClient.post("/v1/upload", {'file_name': file_name})
  return response.data
}

export const getObjectService = async (file_path: string): Promise<{url: string}> => {
  const response = await apiClient.get(`/v1/get-object`, { params: { file_path: file_path } });
  return response.data;
};
