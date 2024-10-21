import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [savedBooks, setSavedBooks] = useState([]);

    const addBook = (book) => {
        setSavedBooks((prevBooks) => [...prevBooks, book]);
    };

    const removeBook = (bookId) => {
        setSavedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    };

    return (
        <BookContext.Provider value={{ savedBooks, addBook, removeBook }}>
            {children}
        </BookContext.Provider>
    );
};
