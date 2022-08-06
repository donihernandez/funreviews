import { FC, ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthContext } from './context';
import { auth } from '@/utils/firebase';

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const value = {
        email,
        password,
        setEmail,
        setPassword,
        setUser,
        user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider };
