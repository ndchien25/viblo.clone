/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '@/routes/private';
import PublicRoute from '@/routes/public';
import AdminRoute from '@/routes/admin';
import RootLayout from '@/layouts/RootLayout';
import MainLayout from '@/layouts/MainLayout';
import MinimalLayout from '@/layouts/MinimalLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { PATHS } from './paths';
import SuspenseWrapper from './SuspenseWrapper';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPassordPage'));
const VerifyEmail = lazy(() => import('@/pages/auth/SendVerifyEmaiPage'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const Homepage = lazy(() => import('@/pages/Homepage'));
const PublishPostPage = lazy(() => import('@/pages/posts/PublishPostPage'));
const PostDetailPage = lazy(() => import('@/pages/posts/PostDetailPage'));
const NewestPage = lazy(() => import('@/pages/Newest'));
const UserPage = lazy(() => import('@/pages/admin/users/page'));


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={PATHS.AUTH.LOGIN} element={<SuspenseWrapper><LoginPage /></SuspenseWrapper>} />
      <Route path={PATHS.AUTH.REGISTER} element={<SuspenseWrapper><RegisterPage /></SuspenseWrapper>} />
      <Route path={PATHS.AUTH.FORGOT_PASSWORD} element={<SuspenseWrapper><ForgotPasswordPage /></SuspenseWrapper>} />
      <Route path={PATHS.AUTH.VERIFY_EMAIL} element={<SuspenseWrapper><VerifyEmail /></SuspenseWrapper>} />
      <Route path={PATHS.AUTH.RESET_PASSWORD} element={<SuspenseWrapper><ResetPassword /></SuspenseWrapper>} />

      <Route element={<PublicRoute><RootLayout /></PublicRoute>}>
        <Route element={<MinimalLayout />}>
          <Route path={PATHS.POSTS.DETAIL} element={<SuspenseWrapper><PostDetailPage /></SuspenseWrapper>} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path={PATHS.POSTS.NEWEST} element={<SuspenseWrapper><NewestPage /></SuspenseWrapper>} />
          <Route path={PATHS.POSTS.FOLLOWINGS} element={<SuspenseWrapper><Homepage /></SuspenseWrapper>} />
        </Route>
      </Route >

      <Route path="/" element={<PrivateRoute><RootLayout /></PrivateRoute>}>
        <Route path={PATHS.POSTS.PUBLISH} element={<SuspenseWrapper><PublishPostPage /></SuspenseWrapper>} />
      </Route>
      <Route path={PATHS.ADMIN.BASE} element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path={PATHS.ADMIN.DASHBOARD} element={<></>} />
        <Route path={PATHS.ADMIN.USERS}>
          <Route path={PATHS.ADMIN.USERS_CATALOGUE} element={<></>} />
          <Route path={PATHS.ADMIN.USERS_INDEX} element={<SuspenseWrapper><UserPage /></SuspenseWrapper>} />
        </Route>
      </Route>
      <Route path="*" element={<SuspenseWrapper><Navigate to={PATHS.NOT_FOUND} replace /></SuspenseWrapper>} />
    </Route >

  )
)

export default router