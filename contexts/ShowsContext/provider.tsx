import { useState } from 'react';
import { ShowsContext } from './context';

const ShowsProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [type, setType] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const value = {
        genres,
        isSearching,
        searchTerm,
        setGenres,
        setIsSearching,
        setSearchTerm,
        setTotalPages,
        setType,
        totalPages,
        type,
    };

    return (
        <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>
    );
};

export { ShowsProvider };
