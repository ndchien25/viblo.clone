import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPassordPage';
import { Homepage } from '@/pages/Homepage';
import VerifyEmail from '@/pages/SendVerifyEmaiPage';
import ResetPassword from '@/pages/ResetPasswordPage';
import MainLayout from '@/layouts/MainLayout';
import MinimalLayout from '@/layouts/MinimalLayout';
import PublishPostPage from './pages/PublishPostPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />
  },
  {
    path: '/send-activation',
    element: <VerifyEmail />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "newest",
        element: <Homepage />
      },
      {
        path: "followings",
        element: <Homepage />
      }
    ]
  },
  {
    path: '/publish',
    element: < MinimalLayout/>,
    children: [
      {
        path: "post",
        element: < PublishPostPage/>
      }
    ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
