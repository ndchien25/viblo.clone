import { authAtom, userAtom } from "@/atoms/authAtoms";
import { apiClient } from "@/configs/axios";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [auth, setAuth] = useAtom(authAtom);
    const [user, setUser] = useAtom(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth || user == null) {
            const checkAuth = async () => {
                try {
                    const { data } = await apiClient.get('/v1/auth-check');
                    if (data.authenticated) {
                        setAuth(true);
                        setUser(data.user)
                    } else {
                        navigate('/login')
                    }
                } catch (error: any) {
                    console.log(error);
                    setAuth(false);
                }
            };

            checkAuth();
        }
    }, [auth, navigate, setAuth, setUser, user])
    return auth && user ? children : null
};

export default PrivateRoute;
