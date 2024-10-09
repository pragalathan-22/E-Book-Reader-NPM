import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech'; // Correctly import Speech from expo-speech

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;

  const handlePlayText = () => {
    const textToRead = book.content || "This is the book content that will be read aloud.";
    Speech.speak(textToRead);  // Use Speech.speak to read text aloud
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#334155', '#131624']} style={styles.gradient}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: book.cover }} style={styles.bookCover} />

          <View style={styles.contentContainer}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>by {book.author}</Text>
            <Text style={styles.bookContent}>
              {book.content || "This is some placeholder content for the book. Replace it with the actual content."}
            </Text>
          </View>

          <TouchableOpacity style={styles.playButton} onPress={handlePlayText}>
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#2b394b',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    margin: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  bookCover: {
    width: '100%',
    height: 300,
    opacity: 0.8,  // Set transparency
    marginBottom: 20,
    borderRadius: 10,
  },
  contentContainer: {
    backgroundColor: '#2b394b',
    borderRadius: 10,
    padding: 20,
  },
  bookTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  bookAuthor: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  bookContent: {
    color: 'white',
    fontSize: 16,
    textAlign: 'justify',
  },
  playButton: {
    backgroundColor: '#34d399', // Green color for play button
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
