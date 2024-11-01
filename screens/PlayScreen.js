import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import { BookContext } from '../context/BookContext';
import { doc, updateDoc } from "firebase/firestore"; // Import Firebase Firestore functions
import { db } from '../services/firebase'; // Import your Firebase configuration

// Dummy translation function
const translateText = async (text, targetLanguage) => {
  return targetLanguage !== 'English' ? `Translated (${targetLanguage}): ${text}` : text;
};

const PlayScreen = ({ route }) => {
  const { book } = route.params;
  const { savedBooks, addBook, removeBook, addToRecentlyPlayed } = useContext(BookContext);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedVoice, setSelectedVoice] = useState('Male');
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingChapter, setPlayingChapter] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const translatedContentRef = useRef('');
  const wordHighlightIntervalRef = useRef(null);
  const currentSpeechIndexRef = useRef(0); // Reference for current speech index

  // Convert chapters from object to array
  const chaptersArray = book.chapters ? Object.values(book.chapters) : [];

  useEffect(() => {
    handleBookPlay(); // Call this when the screen loads to play the book.

    return () => {
      // Cleanup function to stop speech when unmounted
      Speech.stop();
      clearInterval(wordHighlightIntervalRef.current);
    };
  }, []);

  const handleBookPlay = async () => {
    // Increment the suggestion count
    const bookRef = doc(db, "books", book.id);
    await updateDoc(bookRef, {
      suggestionCount: (book.suggestionCount || 0) + 1,
    });
    // Additional logic to play the book can go here
  };

  const handlePlayChapter = async (chapter, index) => {
    if (playingChapter !== null && playingChapter !== index) {
      Speech.stop();
      setIsPlaying(false);
      setPlayingChapter(null);
      setCurrentWordIndex(0);
      setExpandedChapter(null); // Collapse the previous chapter
    }

    if (playingChapter === index) {
      Speech.stop();
      clearInterval(wordHighlightIntervalRef.current);
      setIsPlaying(false);
      setPlayingChapter(null);
    } else {
      if (selectedLanguage !== 'English' && translatedContentRef.current === '') {
        translatedContentRef.current = await translateText(chapter.content, selectedLanguage);
      } else {
        translatedContentRef.current = chapter.content;
      }

      addToRecentlyPlayed(book);
      const words = translatedContentRef.current.split(' ');

      const voice = selectedVoice === 'Male' ? 'com.apple.ttsbundle.Jack-compact' : 'com.apple.ttsbundle.Moira-compact';

      const options = {
        language: selectedLanguage === 'English' ? 'en' : 'ta',
        voice: voice,
        pitch: selectedVoice === 'Female' ? 1 : 1.2,
        rate: 0.8,
        onStart: () => {
          setCurrentWordIndex(currentSpeechIndexRef.current); // Start from the current index
          startWordHighlighting(words);
        },
        onDone: () => {
          setIsPlaying(false);
          setPlayingChapter(null);
          setCurrentWordIndex(0);
          currentSpeechIndexRef.current = 0; // Reset for next play
          clearInterval(wordHighlightIntervalRef.current); // Clear interval
        },
        onStopped: () => {
          setIsPlaying(false);
          setPlayingChapter(null);
          clearInterval(wordHighlightIntervalRef.current); // Clear interval
        },
      };

      // Start speech from the current word index if resuming
      if (currentWordIndex > 0) {
        const currentText = words.slice(currentWordIndex).join(' ');
        Speech.speak(currentText, options);
      } else {
        Speech.speak(translatedContentRef.current, options);
      }

      setIsPlaying(true);
      setPlayingChapter(index);
      setExpandedChapter(index); // Keep expanded chapter visible
    }
  };

  const startWordHighlighting = (words) => {
    wordHighlightIntervalRef.current = setInterval(() => {
      if (currentSpeechIndexRef.current < words.length) {
        setCurrentWordIndex(currentSpeechIndexRef.current);
        currentSpeechIndexRef.current += 1; // Update the reference for the current speech index
      } else {
        clearInterval(wordHighlightIntervalRef.current);
      }
    }, 500); // Adjust timing as necessary to match the speech speed
  };

  const handleSaveBook = () => {
    if (!savedBooks.some((savedBook) => savedBook.id === book.id)) {
      addBook(book);
      Alert.alert('Success', 'Book saved successfully!');
    } else {
      Alert.alert('Info', 'Book is already saved.');
    }
  };

  const handleUnsaveBook = () => {
    removeBook(book.id);
    Alert.alert('Success', 'Book removed from library.');
  };

  const isBookSaved = savedBooks.some((savedBook) => savedBook.id === book.id);

  const handleWordPress = (word, index) => {
    const words = translatedContentRef.current.split(' ');
    const textToSpeak = words.slice(index).join(' '); // Get words from the clicked index to the end
    const options = {
      language: selectedLanguage === 'English' ? 'en' : 'ta',
      voice: selectedVoice === 'Male' ? 'com.apple.ttsbundle.Jack-compact' : 'com.apple.ttsbundle.Moira-compact',
      pitch: selectedVoice === 'Female' ? 1 : 1.2,
      rate: 0.8,
    };

    Speech.stop(); // Stop any ongoing speech
    Speech.speak(textToSpeak, options); // Speak from the clicked word to the end
    setCurrentWordIndex(index); // Set the current word index
    currentSpeechIndexRef.current = index; // Update the reference for the current speech index
    startWordHighlighting(words); // Start highlighting from the clicked word
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#334155', '#131624']} style={styles.gradient}>
        <View style={styles.bookContainer}>
          <Image source={{ uri: book.bookImage }} style={styles.bookCover} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.bookHeader}>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text style={styles.bookTitle} numberOfLines={1} ellipsizeMode="tail">
                {book.bookName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={isBookSaved ? handleUnsaveBook : handleSaveBook} style={styles.saveIconContainer}>
              <Icon name={isBookSaved ? 'bookmark' : 'bookmark-outline'} size={24} color="white" />
            </TouchableOpacity>
          </View>

          {chaptersArray.map((chapter, index) => (
            <View key={index} style={styles.chapterContainer}>
              <TouchableOpacity onPress={() => setExpandedChapter(expandedChapter === index ? null : index)} style={styles.chapterHeader}>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
                <TouchableOpacity
                  style={styles.circularPlayButton}
                  onPress={() => handlePlayChapter(chapter, index)}
                >
                  <Icon
                    name={isPlaying && playingChapter === index ? 'stop' : 'play'}
                    size={20}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              {expandedChapter === index && (
                <ScrollView style={styles.chapterContentContainer}>
                  <Text style={styles.chapterContent}>
                    {translatedContentRef.current.split(' ').map((word, i) => (
                      <TouchableOpacity key={i} onPress={() => handleWordPress(word, i)}>
                        <Text
                          style={{
                            color: currentWordIndex === i ? 'yellow' : 'white',
                          }}
                        >
                          {word}{' '}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </Text>
                </ScrollView>
              )}
            </View>
          ))}
        </View>

        {/* Modal for showing author name and description */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{book.bookName}</Text>
              <Text style={styles.modalAuthor}>{book.authorName}</Text>
              <Text style={styles.modalDescription}>{book.description}</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131624',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  bookContainer: {
    width: '50%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  bookCover: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
    width: '100%',
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bookTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  saveIconContainer: {
    marginLeft: 3,
  },
  chapterContainer: {
    marginVertical: 10,
    marginTop: 5,
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 18,
    color: '#7b67b5',
    fontWeight: 'bold',
  },
  circularPlayButton: {
    width: 30,
    height: 30,
    backgroundColor: '#7b67b5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterContentContainer: {
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    maxHeight: 300,
    overflow: 'scroll', // Enable scrolling if content exceeds max height
  },
  chapterContent: {
    fontSize: 24, // Increased font size
    color: 'white',
    lineHeight: 28, // Adjust line height proportionally
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalAuthor: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#7b67b5',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});
