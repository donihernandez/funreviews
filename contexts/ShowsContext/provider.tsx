import { FC, useMemo } from 'react';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { ShowsContext } from './context';
import { db } from '@/utils/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

interface IShowsProviderProps {
    children: React.ReactNode;
}

const ShowsProvider: FC<IShowsProviderProps> = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [isVideo, setIsVideo] = useState(false);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);

    const updateShows = newShows => {
        if (shows.length > 0) {
            setShows([]);
        }
        setShows(newShows);
    };

    const storeReview = async (
        showId: number,
        showTitle: string,
        rating: number,
        review: string,
    ) => {
        const auth = getAuth();
        const user = auth.currentUser;

        let userData = null;
        const userDocRef = doc(db, 'users', user.uid);

        const userSnapShot = await getDoc(userDocRef);
        if (userSnapShot.exists()) {
            userData = userSnapShot.data();

            const newReviews = userData.reviews ?? [];
            newReviews.push({
                avatar: userData?.avatar,
                date: new Date().toDateString(),
                rating,
                review,
                showId,
                showTitle,
                userId: userData.id,
                username: userData.username,
            });
            await updateDoc(userDocRef, {
                reviews: newReviews,
            });

            const reviewDocRef = doc(db, 'reviews', showId.toString());
            await setDoc(reviewDocRef, {
                reviews: newReviews,
            });

            Swal.fire({
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                title: 'Your review has been saved',
            });
        }
    };

    const getReviewsById = async (id: number) => {
        const reviewDocRef = doc(db, 'reviews', id.toString());
        const reviewSnap = await getDoc(reviewDocRef);
        let reviewsList = null;
        if (reviewSnap.exists()) {
            reviewsList = reviewSnap.data();
        }

        return reviewsList ?? [];
    };

    const memoedValue = useMemo(
        () => ({
            genres,
            getReviewsById,
            isSearching,
            isVideo,
            loading,
            movieGenres,
            searchTerm,
            setGenres,
            setIsSearching,
            setIsVideo,
            setLoading,
            setMovieGenres,
            setSearchTerm,
            setShows,
            setTotalPages,
            setTvGenres,
            shows,
            storeReview,
            totalPages,
            tvGenres,
            updateShows,
        }),
        [shows, setShows, genres, setGenres, setTotalPages, totalPages],
    );

    return (
        <ShowsContext.Provider value={memoedValue}>
            {children}
        </ShowsContext.Provider>
    );
};

export { ShowsProvider };
