import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import { BookContext } from '../context/BookContext';

// Dummy translation function, implement with a real translation API if needed.
const translateText = async (text, targetLanguage) => {
  return targetLanguage !== 'English' ? `Translated (${targetLanguage}): ${text}` : text;
};

const PlayScreen = ({ route }) => {
  const { book } = route.params;
  const { savedBooks, addBook, removeBook, addToRecentlyPlayed } = useContext(BookContext);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedVoice, setSelectedVoice] = useState('Male');
  const [showOptions, setShowOptions] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingChapter, setPlayingChapter] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const translatedContentRef = useRef('');

  // Convert chapters from object to array
  const chaptersArray = book.chapters ? Object.values(book.chapters) : [];

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

    addToRecentlyPlayed(book);

    const words = translatedContentRef.current.split(' ');
    
    // Change voice based on selectedVoice state
    const voice = selectedVoice === 'Male' ? 'com.apple.ttsbundle.Jack-compact' : 'com.apple.ttsbundle.Moira-compact';

    const options = {
      language: selectedLanguage === 'English' ? 'en' : 'ta',
      voice: voice, // Use dynamic voice based on selection
      pitch: selectedVoice === 'Male' ? 1 : 1.2,
      rate: 0.7,
      onStart: () => setCurrentWordIndex(0),
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

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#334155', '#131624']} style={styles.gradient}>
        <View style={styles.bookContainer}>
          <Image source={{ uri: book.bookImage }} style={styles.bookCover} />
        </View>

        <ScrollView style={styles.textContainer}>
          <View style={styles.bookHeader}>
            <Text style={styles.bookTitle}>{book.bookName}</Text>
            <TouchableOpacity onPress={isBookSaved ? handleUnsaveBook : handleSaveBook} style={styles.saveIconContainer}>
              <Icon name={isBookSaved ? 'bookmark' : 'bookmark-outline'} size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.bookAuthor}>{book.authorName}</Text>
          <Text style={styles.bookDescription}>{book.description}</Text>

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
                <View style={styles.chapterContentContainer}>
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
            {/* Language Picker - Uncomment if needed */}
            {/* <Text style={styles.label}>Select Language:</Text>
            <Picker
              selectedValue={selectedLanguage}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              dropdownIconColor="white"
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Tamil" value="Tamil" />
            </Picker> */}

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
    marginRight: 10,
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
    marginBottom: 10,
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
    fontSize: 20,
    color: '#498bd1',
  },
  circularPlayButton: {
    borderRadius: 30,
    backgroundColor: '#4a86e8',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterContentContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  chapterContent: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    width: 150,
    backgroundColor: '#34495e',
    color: 'white',
  },
});
