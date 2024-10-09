import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PlayScreen = ({ route }) => {
  const { book } = route.params; // Get book data passed from SeeMoreScreen

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
        </ScrollView>

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
    backgroundColor: '#131624', // Set solid background color
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center items vertically
  },
  bookContainer: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    overflow: 'hidden', // Ensures the shadow is clipped to the rounded corners
    marginBottom: 20, // Space below the book cover
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3, // Adjust for more or less shadow visibility
    shadowRadius: 10, // Blur effect for shadow
    elevation: 5, // For Android shadow support
  },
  bookCover: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    position: 'absolute', // Position it absolutely within the bookContainer
    opacity: 0.2, // Lightly show the book image
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
  playButton: {
    backgroundColor: '#4CAF50', // Green color for play button
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    width: '80%', // Set width to avoid full-width button
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
