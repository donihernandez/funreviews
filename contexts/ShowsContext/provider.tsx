import { useState } from 'react';
import { ShowsContext } from './context';

const ShowsProvider = ({ children }) => {
    const [shows, setShows] = useState([]);
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [type, setType] = useState('');

    const value = {
        genres,
        setGenres,
        setShows,
        setTotalPages,
        setType,
        shows,
        totalPages,
        type,
    };

    return (
        <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
    );
};

export { ShowsProvider };
