import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';

const translateText = async (text, targetLanguage) => {
  // Implement translation logic using a translation API.
  return text;
};

const PlayScreen = ({ route }) => {
  const { book } = route.params;
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

      const words = translatedContentRef.current.split(' ');
      const options = {
        language: selectedLanguage === 'English' ? 'en' : 'ta',
        pitch: selectedVoice === 'Male' ? 1 : 1.2,
        rate: 0.8, // Increase this value for faster speech (1 is normal, 1.5 is faster)
        onStart: () => {
          setCurrentWordIndex(0); // Start from the first word
        },
        onDone: () => {
          setIsPlaying(false);
          setPlayingChapter(null); // Reset playing chapter
          setExpandedChapter(null); // Collapse chapter
          setCurrentWordIndex(0); // Reset current word index
        },
        onStopped: () => {
          setIsPlaying(false);
          setPlayingChapter(null); // Reset playing chapter
          setExpandedChapter(null); // Collapse chapter
          setCurrentWordIndex(0); // Reset current word index
        },
      };

      Speech.speak(translatedContentRef.current, options);

      setIsPlaying(true);
      setPlayingChapter(index);
      setExpandedChapter(index);

      // Simulate word highlighting
      const wordHighlightInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(wordHighlightInterval); // Clear interval after last word
        }
      }, 500); // Adjust timing as needed (e.g., 500ms per word)

      // Reset current word index when the chapter is stopped
      return () => clearInterval(wordHighlightInterval);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#334155', '#131624']} style={styles.gradient}>
        <View style={styles.bookContainer}>
          <Image source={{ uri: book.image }} style={styles.bookCover} />
        </View>

        <ScrollView style={styles.textContainer}>
          <Text style={styles.bookTitle}>{book.title}</Text>
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
                          color: currentWordIndex === i ? 'yellow' : 'white', // Highlight current word color
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

        {/* Settings Icon */}
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)} style={styles.iconContainer}>
          <Icon name="settings-outline" size={30} color="white" />
        </TouchableOpacity>

        {/* Settings Options */}
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
    width: '100%',
    height: 300,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
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
    borderRadius: 5,
    position: 'absolute',
    opacity: 0.2,
  },
  textContainer: {
    padding: 20,
    width: '100%',
  },
  bookTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
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
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 1,
  },
  optionsContainer: {
    padding: 15,
    width: '50%',
    backgroundColor: '#2D3748',
    position: 'absolute',
    right: 20,
    top: 100,
    borderRadius: 10,
    zIndex: 1,
    elevation: 5,
  },
});
