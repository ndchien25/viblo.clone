import { authAtom, userAtom } from "@/atoms/authAtoms";
import { authCheck } from "@/services/AuthService";
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
        const checkAuth = async () => {
            const respone = await authCheck((err: any) => {
                setAuth(false)
                console.log(err);
            });

            if (respone?.data?.authenticated) {
                setAuth(true);
                setUser(respone?.data?.user)
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

export default PrivateRoute;
