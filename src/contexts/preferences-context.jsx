import React, { createContext, useState } from 'react';

export const PreferencesContext = createContext();
const PreferencesProvider = ({ children }) => {
    const [displayComplete, setDisplayComplete] = useState(false);
    const [displayNumber, setDisplayNumber] = useState(3);
    const [sortBy, setSortBy] = useState('difficulty');
    const [pageNum, setPageNum] = useState(1);
    const [pageButtons, setPageButtons] = useState(1)
    return (
        <PreferencesContext.Provider value={{ 
        displayComplete, 
        setDisplayComplete, 
        displayNumber, 
        setDisplayNumber, 
        sortBy, 
        setSortBy, 
        pageNum, 
        setPageNum,
        pageButtons, 
        setPageButtons
         }}>
            {children}
        </PreferencesContext.Provider>
    );
}

export default PreferencesProvider;