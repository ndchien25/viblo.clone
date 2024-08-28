import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPassord';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
