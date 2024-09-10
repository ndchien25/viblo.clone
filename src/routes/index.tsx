import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPassordPage';
import { Homepage } from '@/pages/Homepage';
import VerifyEmail from '@/pages/SendVerifyEmaiPage';
import ResetPassword from '@/pages/ResetPasswordPage';
import MainLayout from '@/layouts/MainLayout';
import MinimalLayout from '@/layouts/MinimalLayout';
import PublishPostPage from '@/pages/PublishPostPage';
import GetPostPage from '@/pages/Post/GetPostPage';
import RootLayout from '@/layouts/RootLayout';
import PrivateRoute from '@/routes/private';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PublicRoute from './public';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/send-activation' element={<VerifyEmail />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/' element={
        <PublicRoute>
          < RootLayout />
        </PublicRoute>
      }>
        <Route element={
          <MinimalLayout />
        }>
          <Route
            path="/publish/post"
            element={
              <PrivateRoute>
                <PublishPostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/p/:slug"
            element={
              <GetPostPage />
            }
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="newest" element={<Homepage />} />
          <Route path="followings" element={<Homepage />} />
        </Route>
      </Route >
    </Route >
  )
)

export default router