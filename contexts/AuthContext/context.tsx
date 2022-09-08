import { createContext, useContext } from 'react';

const AuthContext = createContext(null);
AuthContext.displayName = 'AuthContext';

const useAuthContext = () => {
    return useContext(AuthContext);
};

export { useAuthContext, AuthContext };
