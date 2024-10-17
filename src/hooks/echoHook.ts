import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { apiClient } from '@/configs/axios';

window.Pusher = Pusher;

// Khởi tạo Echo
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1', 
  wsPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
  wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
  forceTLS: true,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  authorizer: (channel: { name: any; }) => {
    return {
      authorize: (socketId: string, callback: any) => {
        apiClient.post('/v1/broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name
        })
          .then(response => {
            callback(false, response.data);
          })
          .catch(error => {
            callback(true, error);
          });
      }
    };
  },
});

// window.Echo = new Echo({
//   broadcaster: 'reverb',
//   key: import.meta.env.VITE_REVERB_APP_KEY,
//   wsHost: import.meta.env.VITE_REVERB_HOST,
//   wsPort: import.meta.env.VITE_REVERB_PORT,
//   wssPort: import.meta.env.VITE_REVERB_PORT,
//   forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
//   enabledTransports: ['ws', 'wss'],
// });