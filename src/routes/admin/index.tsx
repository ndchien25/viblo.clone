import { authAtom, userAtom } from "@/atoms/authAtoms";
import { authCheck } from "@/services/AuthService";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [auth, setAuth] = useAtom(authAtom);
  const [user, setUser] = useAtom(userAtom)
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const respone = await authCheck((err: any) => {
        setAuth(false)
        console.log(err);
      });

      if (respone?.data?.authenticated) {
        setAuth(true);
        setUser(respone?.data?.user)
        if (respone?.data?.user?.role_id === 1) {
          if (!location.pathname.startsWith('/admin')) {
            navigate('/admin/dashboard');
          }
        } else {
          navigate('/newest')
        }
      } else {
        navigate('/login', { replace: true })
      }
    };

    if (!auth || !user) {
      checkAuth();
    }
  }, [auth, navigate, setAuth, setUser, user])
  return auth && user ? children : null
};

export default AdminRoute;
