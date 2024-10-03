import { Link } from 'react-router-dom';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Notification } from '@/models/Notification';
const truncate = (text: string, length: number) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

const renderNotificationContent = (notification: Notification) => {
  const maxLength = 50; 
  switch (notification.type) {
    case 'App\\Notifications\\CommentNotification':
      return (
        <>
          <span className="font-bold">{notification.data.user.username}</span>
          {notification.data.parent_id ? (
            ` vừa trả lời comment của bạn: ${truncate(notification.data.content, maxLength)}`
          ) : (
            ` vừa bình luận vào bài viết của bạn: ${truncate(notification.data.content, maxLength)}`
          )}
        </>
      );
    case 'like':
      return (
        <>
          <span className="font-bold">{notification.data.user.username}</span>
          {` đã thích bài viết: ${notification.data.post_title}`}
        </>
      );
    case 'follow':
      return (
        <>
          <span className="font-bold">{notification.data.user.username}</span>
          {` đã theo dõi bạn.`}
        </>
      );
    default:
      return null;
  }
};
interface NotificationsListProps {
  notifications: Notification[]
}

const NotificationsList = ({ notifications }: NotificationsListProps) => (
  <>
    {notifications.map((notification: Notification) => (
      <DropdownMenuItem key={notification.id} className="px-6 py-2">
        <Link to={`/posts/${notification.data.post_slug}`} className="block">
          <span>{renderNotificationContent(notification)}</span>
          <br />
          <small className="font-extralight">
            {new Date(notification.created_at).toLocaleString()}
          </small>
        </Link>
      </DropdownMenuItem>
    ))}
  </>
);

export default NotificationsList;
