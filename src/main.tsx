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
import { Homepage } from './pages/Homepage';
import Layout from './components/layouts/layouts';
import VerifyEmail from './pages/SendVerifyEmaiPage';
import ResetPassword from './pages/ResetPasswordPage';

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
    element: <Layout />,
    children: [
      {
        path: "newest",
        element: <Homepage />
      }
    ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
