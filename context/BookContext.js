import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [savedBooks, setSavedBooks] = useState([]);
    const [recentlyPlayedBooks, setRecentlyPlayedBooks] = useState([]);

    const addBook = (book) => {
        setSavedBooks((prevBooks) => [...prevBooks, book]);
    };

    const removeBook = (bookId) => {
        setSavedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    };

    const addToRecentlyPlayed = (book) => {
        setRecentlyPlayedBooks((prevBooks) => {
            const bookExists = prevBooks.some((b) => b.id === book.id);
            if (!bookExists) {
                return [book, ...prevBooks].slice(0, 5); // Limit to 5 recent books
            }
            return prevBooks;
        });
    };

    return (
        <BookContext.Provider value={{ 
            savedBooks, 
            addBook, 
            removeBook, 
            recentlyPlayedBooks, 
            addToRecentlyPlayed 
        }}>
            {children}
        </BookContext.Provider>
    );
};
