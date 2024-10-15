import React, { createContext, useState } from 'react';

// Create the context
export const BooksContext = createContext();

// Create a provider component
export const BooksProvider = ({ children }) => {
    const [savedBooks, setSavedBooks] = useState([]);

    const addBookToSaved = (book) => {
        setSavedBooks((prevBooks) => [...prevBooks, book]);
    };

    return (
        <BooksContext.Provider value={{ savedBooks, addBookToSaved }}>
            {children}  {/* Ensure this is valid JSX and no strings directly */}
        </BooksContext.Provider>
    );
};
