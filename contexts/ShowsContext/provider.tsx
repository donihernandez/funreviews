import type { FC } from 'react';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { ShowsContext } from './context';
import { db } from '@/utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

interface IShowsProviderProps {
    children: React.ReactNode;
}

const ShowsProvider: FC<IShowsProviderProps> = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [type, setType] = useState('movie');
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
                rating,
                review,
                showId,
                showTitle,
            });
            await updateDoc(userDocRef, {
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

    const value = {
        genres,
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
        setType,
        shows,
        storeReview,
        totalPages,
        tvGenres,
        type,
        updateShows,
    };

    return (
        <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
    );
};

export { ShowsProvider };
