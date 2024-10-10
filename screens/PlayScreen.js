import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdowns
import Icon from 'react-native-vector-icons/Ionicons'; // Import an icon library

const PlayScreen = ({ route }) => {
  const { book } = route.params; // Get book data passed from SeeMoreScreen

  // State variables for language and voice selection
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedVoice, setSelectedVoice] = useState('Male');
  const [showOptions, setShowOptions] = useState(false); // State to toggle visibility
  const [expandedChapter, setExpandedChapter] = useState(null); // Track which chapter is expanded

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

          {/* Display Chapter Titles */}
          {book.chapters.map((chapter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setExpandedChapter(expandedChapter === index ? null : index)}
              style={styles.chapterContainer}
            >
              <Text style={styles.chapterTitle}>{chapter.title}</Text>
              {expandedChapter === index && (
                <Text style={styles.chapterContent}>{chapter.content}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Icon to toggle options (Settings Icon) */}
        <TouchableOpacity 
          onPress={() => setShowOptions(!showOptions)} 
          style={styles.iconContainer}
        >
          <Icon name="settings-outline" size={30} color="white" />
        </TouchableOpacity>

        {/* Language and Voice Selector (conditionally rendered) */}
        {showOptions && (
          <View style={styles.optionsContainer}>
            {/* Language Selector */}
            <Text style={styles.label}>Select Language:</Text>
            <Picker
              selectedValue={selectedLanguage}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              dropdownIconColor="white" // Change dropdown icon color
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Spanish" value="Spanish" />
              <Picker.Item label="French" value="French" />
              <Picker.Item label="German" value="German" />
              {/* Add more languages as needed */}
            </Picker>

            {/* Voice Selector */}
            <Text style={styles.label}>Select Voice:</Text>
            <Picker
              selectedValue={selectedVoice}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedVoice(itemValue)}
              dropdownIconColor="white" // Change dropdown icon color
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        )}

        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
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
  playButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    width: '80%',
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white', // Change the text color
  },
  iconContainer: {
    position: 'absolute', // Position the icon absolutely
    right: 20, // Position from the right
    top: 40, // Position from the top
    zIndex: 1, // Ensure the icon is above other elements
  },
  optionsContainer: {
    padding: 20,
    width: '100%',
    backgroundColor: '#2D3748', // Background color for options
    position: 'absolute',
    top: 300, // Adjust to position under the book container
    zIndex: 1, // Ensure options are above other elements
  },
});
