import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </QueryClientProvider>
)
