import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from './components/ui/toaster';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { apiClient } from './configs/axios';

// Khởi tạo QueryClient
const queryClient = new QueryClient();

window.Pusher = Pusher;

// Khởi tạo Echo
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  encrypted: true,
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

// Bọc ứng dụng trong StrictMode
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster />
  </QueryClientProvider>
);
