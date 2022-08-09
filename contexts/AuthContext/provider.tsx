import { FC, ReactNode, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import { AuthContext } from './context';
import { auth } from '@/utils/firebase';
interface IAuthProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                console.log('User signed in:', user);
                setUser({
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                });
            } else {
                console.log('User signed out');
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signUp = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signIn = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = async () => {
        setUser(null);
        await signOut(auth);
    };

    const value = {
        logout,
        setUser,
        signIn,
        signUp,
        user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider };
