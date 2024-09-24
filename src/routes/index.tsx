import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPassordPage';
import { Homepage } from '@/pages/Homepage';
import VerifyEmail from '@/pages/auth/SendVerifyEmaiPage';
import ResetPassword from '@/pages/auth/ResetPasswordPage';
import MainLayout from '@/layouts/MainLayout';
import MinimalLayout from '@/layouts/MinimalLayout';
import PublishPostPage from '@/pages/posts/PublishPostPage';
import RootLayout from '@/layouts/RootLayout';
import PrivateRoute from '@/routes/private';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PublicRoute from './public';
import PostDetailPage from '@/pages/posts/PostDetailPage';
import NewestPage from '@/pages/Newest';
import AdminRoute from './admin';
import AdminLayout from '@/layouts/AdminLayout';
import { UserPage } from '@/pages/admin/users/page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/send-activation' element={<VerifyEmail />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      <Route path='/' element={<PublicRoute><RootLayout /></PublicRoute>}>
        <Route element={<MinimalLayout />}>
          <Route path="/p/:slug" element={<PostDetailPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="newest" element={<NewestPage />} />
          <Route path="followings" element={<Homepage />} />
        </Route>
      </Route >

      <Route path="/" element={<PrivateRoute><RootLayout /></PrivateRoute>}>
        <Route path="publish/post" element={<PublishPostPage />} />
      </Route>
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="dashboard">
          <Route path="index" element={<></>} />
        </Route>
        <Route path="user">
          <Route path="catalogue" element={<></>} />
          <Route path="index" element={<UserPage/>} />
        </Route>
      </Route>
    </Route >
  )
)
export default router