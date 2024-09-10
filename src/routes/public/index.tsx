import { authAtom, userAtom } from "@/atoms/authAtoms";
import { authCheck } from "@/services/AuthService";
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
            const respone = await authCheck((err: any) => {
                setAuth(false);
                console.error('An error occurred:', err);
            });

            if (respone?.data?.authenticated) {
                setAuth(true);
                setUser(respone?.data?.user)
            }
        };

        if (!auth || !user) {
            checkAuth();
        }

    }, [auth, setAuth, setUser, user])
    return <>{children}</>
};

export default PublicRoute;
