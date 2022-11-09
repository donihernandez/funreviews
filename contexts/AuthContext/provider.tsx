import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import dayjs from 'dayjs';

import { AuthContext } from './context';
import { auth, db, storage } from '@/utils/firebase';

import { COLORS } from '@/styles/theme';
import { FullPageLoader } from '@/components/common/FullPageLoader';

interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const PROTECTED_ROUTES = ['/profile'];

    useEffect(
        () =>
            onAuthStateChanged(auth, user => {
                if (user) {
                    // Logged in...
                    setLoading(true);
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
        if (user) {
            const usersDocRef = doc(db, 'users', user.uid);

            let userData = null;
            if (user) {
                const userSnapShot = await getDoc(usersDocRef);
                if (userSnapShot.exists()) {
                    userData = userSnapShot.data();
                }
            }

            return userData;
        }
    };

    const signUp = async (
        email: string,
        password: string,
        username: string,
    ) => {
        setLoading(true);

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

        const userDocRef = doc(db, 'users', userCredential.user.uid);

        await setDoc(userDocRef, {
            email,
            id: userCredential.user.uid,
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

    const uploadAvatar = async (profilePic: File) => {
        const storageRef = ref(
            storage,
            `users/${dayjs() + '-' + profilePic.name}`,
        );

        const uploadTask = uploadBytesResumable(storageRef, profilePic);

        uploadTask.on(
            'state_changed',
            (snapshot: any) => {
                setIsUploading(true);
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                );
                setUploadProgress(progress);
            },
            (error: any) => {
                Swal.fire({
                    icon: 'error',
                    text: error,
                    title: 'Oops...',
                });
            },
            async () => {
                const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref,
                );
                Swal.fire({
                    icon: 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    title: 'Your profile picture has been saved',
                });
                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, {
                    avatar: downloadURL,
                });

                setIsUploading(false);
                setUploadProgress(0);
            },
        );
    };

    const memoedValue = useMemo(
        () => ({
            error,
            getCurrentUser,
            isUploading,
            loading,
            logout,
            signIn,
            signUp,
            uploadAvatar,
            uploadProgress,
            user,
        }),
        [user, loading, error],
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {user ? children : <FullPageLoader />}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
