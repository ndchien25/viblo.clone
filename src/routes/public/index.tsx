import { authAtom, userAtom } from "@/atoms/authAtoms";
import { apiClient } from "@/configs/axios";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const [auth, setAuth] = useAtom(authAtom);
    const [user, setUser] = useAtom(userAtom)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await apiClient.get('/v1/auth-check');
                if (data.authenticated) {
                    setAuth(true);
                    setUser(data.user)
                }
            } catch (error: any) {
                console.log(error);
                setAuth(false);
            }
        };

        if (!auth || !user) {
            checkAuth();
        }
        
    }, [auth, setAuth, setUser, user])
    return auth && user ? children : null
};

export default PublicRoute;
