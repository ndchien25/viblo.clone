export type Notification = {
  id: string;
  data: any;
  type: string;
  created_at: Date;
  read_at?: Date
};

export type NotificationPaginationResponse = {
  notifications: Notification[];
  current_page: number;
  total_pages: number;
  total: number;
};
