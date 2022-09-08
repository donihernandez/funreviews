import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import { AuthContext } from './context';
import { auth } from '@/utils/firebase';
import Swal from 'sweetalert2';
import { COLORS } from '@/styles/theme';
import { NOT_LAYOUT_ROUTES } from '@/utils/notLayoutRoutes';

interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const PROTECTED_ROUTES = ['/profile'];

    useEffect(
        () =>
            onAuthStateChanged(auth, user => {
                if (user) {
                    // Logged in...
                    setUser(user);
                    setLoading(false);
                } else if (PROTECTED_ROUTES.includes(router.pathname)) {
                    setUser(null);
                    setLoading(true);
                    router.push('/login');
                    setLoading(false);
                }
            }),
        [auth],
    );

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch(error =>
                Swal.fire({
                    cancelButtonColor: COLORS.primary,
                    icon: 'error',
                    text: error.message,
                    title: 'Oops...',
                }),
            )
            .finally(() => setLoading(false));
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false);
            })
            .catch(error =>
                Swal.fire({
                    cancelButtonColor: COLORS.primary,
                    icon: 'error',
                    text: error.message,
                    title: 'Oops...',
                }),
            )
            .finally(() => setLoading(false));
    };

    const logout = async () => {
        setLoading(true);
        await signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false));
    };

    const memoedValue = useMemo(
        () => ({ error, loading, logout, signIn, signUp, user }),
        [user, loading, error],
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
