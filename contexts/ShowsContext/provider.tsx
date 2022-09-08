import type { FC } from 'react';
import { useState } from 'react';
import { ShowsContext } from './context';

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
