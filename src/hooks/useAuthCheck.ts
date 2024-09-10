import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { authAtom, userAtom } from '@/atoms/authAtoms';
import { apiClient } from '@/configs/axios';

export default function useAuthCheck() {
    const [, setAuth] = useAtom(authAtom);
    const [, setUser] = useAtom(userAtom)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await apiClient.get('/v1/auth-check');
                if (data.authenticated) {
                    setAuth(true);
                    setUser(data.user)
                } else {
                    setAuth(false);
                }
            } catch (error: any) {
                console.log(error);
                setAuth(false);
            }
        };

        checkAuth();
    }, [setAuth, setUser]);
}
