import { useAtom } from 'jotai';
import { authAtom } from '@/atoms/authAtoms';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [auth, ] = useAtom(authAtom);
    
    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}