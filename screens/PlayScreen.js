import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import { BookContext } from '../context/BookContext';

const translateText = async (text, targetLanguage) => {
  // Implement translation logic using a translation API.
  return text; // Return the original text for now (replace with translation logic)
};

const PlayScreen = ({ route }) => {
  const { book } = route.params;
  const { savedBooks, addBook, removeBook, recentlyPlayedBooks, addToRecentlyPlayed } = useContext(BookContext);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedVoice, setSelectedVoice] = useState('Male');
  const [showOptions, setShowOptions] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingChapter, setPlayingChapter] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const translatedContentRef = useRef('');

  const handlePlayChapter = async (chapter, index) => {
    if (playingChapter !== null && playingChapter !== index) {
      Speech.stop();
      setIsPlaying(false);
      setPlayingChapter(null);
      setCurrentWordIndex(0);
    }

    if (playingChapter === index) {
      Speech.stop();
      setIsPlaying(false);
      setPlayingChapter(null);
      setCurrentWordIndex(0);
      setExpandedChapter(null);
    } else {
      if (selectedLanguage !== 'English' && translatedContentRef.current === '') {
        translatedContentRef.current = await translateText(chapter.content, selectedLanguage);
      } else {
        translatedContentRef.current = chapter.content;
      }

      // Save to recently played
      addToRecentlyPlayed(book);

      const words = translatedContentRef.current.split(' ');
      const options = {
        language: selectedLanguage === 'English' ? 'en' : 'ta',
        pitch: selectedVoice === 'Male' ? 1 : 1.2,
        rate: 0.7,
        onStart: () => {
          setCurrentWordIndex(0);
        },
        onDone: () => {
          setIsPlaying(false);
          setPlayingChapter(null);
          setExpandedChapter(null);
          setCurrentWordIndex(0);
        },
        onStopped: () => {
          setIsPlaying(false);
          setPlayingChapter(null);
          setExpandedChapter(null);
          setCurrentWordIndex(0);
        },
      };

      Speech.speak(translatedContentRef.current, options);

      setIsPlaying(true);
      setPlayingChapter(index);
      setExpandedChapter(index);

      const wordHighlightInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(wordHighlightInterval);
        }
      }, 500);

      return () => clearInterval(wordHighlightInterval);
    }
  };

  const handleSaveBook = () => {
    if (!savedBooks.some((savedBook) => savedBook.id === book.id)) {
      addBook(book); // Save the book to context
      Alert.alert('Success', 'Book saved successfully!');
    } else {
      Alert.alert('Info', 'Book is already saved.');
    }
  };

  const handleUnsaveBook = () => {
    removeBook(book.id); // Remove the book from context
    Alert.alert('Success', 'Book removed from library.');
  };

  const isBookSaved = savedBooks.some((savedBook) => savedBook.id === book.id);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#334155', '#131624']} style={styles.gradient}>
        <View style={styles.bookContainer}>
          <Image source={{ uri: book.image }} style={styles.bookCover} />
        </View>

        <ScrollView style={styles.textContainer}>
          <View style={styles.bookHeader}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <TouchableOpacity 
              onPress={isBookSaved ? handleUnsaveBook : handleSaveBook} 
              style={styles.saveIconContainer}
            >
              <Icon name={isBookSaved ? "bookmark" : "bookmark-outline"} size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <Text style={styles.bookDescription}>{book.description}</Text>

          {book.chapters.map((chapter, index) => (
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
                <View>
                  <Text style={styles.chapterContent}>
                    {translatedContentRef.current.split(' ').map((word, i) => (
                      <Text
                        key={i}
                        style={{
                          color: currentWordIndex === i ? 'yellow' : 'white',
                        }}
                      >
                        {word}{' '}
                      </Text>
                    ))}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={() => setShowOptions(!showOptions)} style={styles.iconContainer}>
          <Icon name="settings-outline" size={30} color="white" />
        </TouchableOpacity>

        {showOptions && (
          <View style={styles.optionsContainer}>
            <Text style={styles.label}>Select Language:</Text>
            <Picker
              selectedValue={selectedLanguage}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              dropdownIconColor="white"
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Tamil" value="Tamil" />
            </Picker>

            <Text style={styles.label}>Select Voice:</Text>
            <Picker
              selectedValue={selectedVoice}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedVoice(itemValue)}
              dropdownIconColor="white"
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        )}
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
    width: '50%', // Adjust width for a more rectangular shape
    height: 300, // Make the height longer to resemble a book
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 20, // Added marginTop to move the image down
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
    resizeMode: 'cover', // Keeps the image aspect ratio while filling the container
  },
  textContainer: {
    padding: 20,
    width: '100%',
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  saveIconContainer: {
    marginLeft: 10,
  },
  bookAuthor: {
    color: 'gray',
    fontSize: 18,
  },
  bookDescription: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  chapterContainer: {
    marginVertical: 10,
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterTitle: {
    color: '#34d399',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chapterContent: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'justify',
  },
  circularPlayButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#34d399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    marginVertical: 10,
  },
  optionsContainer: {
    padding: 10,
    backgroundColor: '#1f2937',
    borderRadius: 5,
    position: 'absolute',
    bottom: 70,
    right: 10,
    zIndex: 1,
  },
  picker: {
    height: 50,
    width: 200,
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
