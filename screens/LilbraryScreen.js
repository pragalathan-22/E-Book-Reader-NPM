import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const LibraryScreen = () => {

  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'url_to_cover_image' },
    { title: '1984', author: 'George Orwell', cover: 'url_to_cover_image' },
    // Add more books as needed
  ];

  return (
    <LinearGradient colors={['#334155', '#131624']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Your E-Book Library</Text>
          {books.map((book, index) => (
            <View key={index} style={styles.bookItem}>
              <Image source={{ uri: book.cover }} style={styles.coverImage} />
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  bookItem: {
    marginBottom: 15,
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  bookTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  bookAuthor: {
    color: '#94a3b8',
  },
});
