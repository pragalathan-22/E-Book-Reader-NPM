import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRoute } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/Ionicons';

const ImportPlayScreen = () => {
  const route = useRoute();
  const { fileUri } = route.params; // Get the file URI from the route params
  const [fileContent, setFileContent] = useState(''); // State to store file content
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = useRef([]);
  const wordHighlightIntervalRef = useRef(null); // Ref to store the interval ID

  useEffect(() => {
    const loadFileContent = async () => {
      try {
        const content = await FileSystem.readAsStringAsync(fileUri);
        setFileContent(content); // Set the content to state
        words.current = content.split(' '); // Split content into words for speech
      } catch (error) {
        console.log('Error reading file:', error);
        setError('Error reading file.'); // Set error message
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    loadFileContent();

    return () => {
      clearInterval(wordHighlightIntervalRef.current); // Clear the interval on cleanup
      Speech.stop(); // Ensure Speech is stopped on cleanup
    };
  }, [fileUri]);

  const handlePlay = () => {
    if (isPlaying) {
      // Stop the current playback
      Speech.stop();
      setIsPlaying(false);
      clearInterval(wordHighlightIntervalRef.current); // Clear the interval when stopping
    } else {
      const options = {
        onStart: () => {
          // Reset current index and start highlighting
          setCurrentWordIndex(currentWordIndex);
        },
        onDone: () => {
          setIsPlaying(false);
          setCurrentWordIndex(0);
          clearInterval(wordHighlightIntervalRef.current); // Clear the interval when done
        },
        onStopped: () => {
          setIsPlaying(false);
          clearInterval(wordHighlightIntervalRef.current); // Clear the interval when stopped
        },
      };

      // Start speech from the current word index
      const contentToSpeak = words.current.slice(currentWordIndex).join(' '); // Join remaining words for speech
      Speech.speak(contentToSpeak, options);
      setIsPlaying(true);

      // Store the interval ID in a ref to clear it later
      wordHighlightIntervalRef.current = setInterval(() => {
        if (currentWordIndex < words.current.length) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(wordHighlightIntervalRef.current); // Clear interval when done
        }
      }, 500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Playing File</Text>
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text> // Show error message if any
        ) : (
          <View>
            <Text style={styles.fileText}>
              {fileContent.split(' ').map((word, i) => (
                <Text key={i} style={{ color: currentWordIndex === i ? 'yellow' : 'white' }}>
                  {word}{' '}
                </Text>
              ))}
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
        <Icon name={isPlaying ? 'stop' : 'play'} size={30} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align content at the bottom
    alignItems: 'center',
    backgroundColor: '#131624',
    padding: 20,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center', // Center align text
    width: '100%', // Take full width
    paddingVertical: 20, // Add vertical padding for spacing
  },
  fileText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center', // Center text for better appearance
  },
  errorText: {
    color: 'red', // Error message color
    textAlign: 'center',
    marginTop: 20,
  },
  playButton: {
    marginBottom: 20, // Add some bottom margin
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#34d399',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImportPlayScreen;
