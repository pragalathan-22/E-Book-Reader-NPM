import React, { createContext, useState } from 'react';

export const PlayContext = createContext();

export const PlayProvider = ({ children }) => {
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayContext.Provider value={{ currentChapter, setCurrentChapter, isPlaying, setIsPlaying }}>
      {children}
    </PlayContext.Provider>
  );
};
