export type Notification = {
  id: number;
  data: any;
  created_at: Date;
  read_at?: Date
};

export type NotificationPaginationResponse = {
  notifications: Notification[];
  current_page: number;
  total_pages: number;
  total: number;
};
