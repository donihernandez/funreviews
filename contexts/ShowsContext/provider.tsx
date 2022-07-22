import { useState } from 'react';
import { ShowsContext } from './context';

const ShowsProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [type, setType] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [isVideo, setIsVideo] = useState(false);
    const [shows, setShows] = useState([]);

    const value = {
        genres,
        isSearching,
        isVideo,
        movieGenres,
        searchTerm,
        setGenres,
        setIsSearching,
        setIsVideo,
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
    };

    return (
        <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
    );
};

export { ShowsProvider };
