import { useState } from 'react';
import { ShowsContext } from './context';

const ShowsProvider = ({ children }) => {
    const [shows, setShows] = useState([]);
    const [genres, setGenres] = useState([]);

    const value = {
        genres,
        setGenres,
        setShows,
        shows,
    };

    return (
        <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
    );
};

export { ShowsProvider };
