import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
