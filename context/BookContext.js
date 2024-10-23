import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [recentlyPlayedBooks, setRecentlyPlayedBooks] = useState([]);

  const addBook = (book) => {
    setSavedBooks((prevBooks) => [...prevBooks, book]);
  };

  const removeBook = (id) => {
    setSavedBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const addToRecentlyPlayed = (book) => {
    setRecentlyPlayedBooks((prevBooks) => {
      const existingIndex = prevBooks.findIndex((b) => b.id === book.id);
      if (existingIndex !== -1) {
        return prevBooks; // Book already exists, do not add again
      }
      return [...prevBooks, book];
    });
  };

  return (
    <BookContext.Provider value={{ savedBooks, addBook, removeBook, recentlyPlayedBooks, addToRecentlyPlayed }}>
      {children}
    </BookContext.Provider>
  );
};
