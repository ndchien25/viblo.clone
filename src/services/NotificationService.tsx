import { apiClient } from "@/configs/axios"
import { NotificationPaginationResponse } from "@/models/Notification"

export const getNotificationService = async (page: number, pageSize: number): Promise<NotificationPaginationResponse> => {
  const response = await apiClient.get("/v1/notifications", {
    params: {
      page: page,
      limit: pageSize
    }
  })
  return response.data
}
