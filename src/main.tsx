import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from './components/ui/toaster';
import './hooks/echoHook'
// import { StrictMode } from 'react';
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

// Bọc ứng dụng trong StrictMode
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toaster />
    </QueryClientProvider>
  // </StrictMode>
);
