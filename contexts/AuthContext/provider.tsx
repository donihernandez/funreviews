import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore';

import { useRouter } from 'next/router';
import { AuthContext } from './context';
import { auth, db } from '@/utils/firebase';
import Swal from 'sweetalert2';
import { COLORS } from '@/styles/theme';

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

    const getCurrentUser = async () => {
        const usersCollectionRef = collection(db, 'users');
        let userData = null;
        if (user) {
            const userQuery = query(
                usersCollectionRef,
                where('email', '==', user.email),
            );
            const querySnapshot = await getDocs(userQuery);
            querySnapshot.forEach(doc => {
                userData = doc.data();
            });
        }

        return userData;
    };

    const signUp = async (
        email: string,
        password: string,
        username: string,
    ) => {
        setLoading(true);
        const usersCollectionRef = collection(db, 'users');

        const userCredential: any = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        ).catch(error =>
            Swal.fire({
                cancelButtonColor: COLORS.primary,
                icon: 'error',
                text: error.message,
                title: 'Oops...',
            }),
        );
        setUser(userCredential.user);

        await addDoc(usersCollectionRef, {
            email,
            username,
        }).catch(error =>
            Swal.fire({
                cancelButtonColor: COLORS.primary,
                icon: 'error',
                text: error.message,
                title: 'Oops...',
            }),
        );

        router.push('/');

        setLoading(false);
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

    const logout = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false));
    };

    const updateUser = async userData => {
        const usersCollectionRef = collection(db, 'users');

        const userQuery = query(
            usersCollectionRef,
            where('email', '==', user.email),
        );
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach(document => {
            setDoc(doc(db, 'users', document.id), userData).catch(e => e);
        });

        return 'Your profile has been updated successfully!';
    };

    const memoedValue = useMemo(
        () => ({
            error,
            getCurrentUser,
            loading,
            logout,
            signIn,
            signUp,
            updateUser,
            user,
        }),
        [user, loading, error],
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
