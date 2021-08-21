import { createContext,useContext } from 'react';

export const GlobalContext = createContext({});

export const useLoggedUser = () => {
    const globalContext = useContext(GlobalContext)
    return globalContext.loggedUser
}