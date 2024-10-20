// context/BookContext.js
import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [savedBooks, setSavedBooks] = useState([]);

    const addBook = (book) => {
        setSavedBooks((prevBooks) => [...prevBooks, book]);
    };

    return (
        <BookContext.Provider value={{ savedBooks, addBook }}>
            {children}
        </BookContext.Provider>
    );
};
