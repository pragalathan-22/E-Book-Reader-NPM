import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { booksData } from '../data/books'; // Import the books data

const SeeMoreScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#334155', '#131624']} style={styles.gradient}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>

        {/* Scrollable Books List */}
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>More Books</Text>
          <View style={styles.booksContainer}>
            {booksData.map((book, index) => (
              <TouchableOpacity
                key={index}
                style={styles.bookItem}
                onPress={() => navigation.navigate('PlayScreen', { book })} // Navigate to PlayScreen with book data
              >
                <Image source={{ uri: book.image }} style={styles.bookCover} />
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SeeMoreScreen;

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
    paddingBottom: 100, // Ensure content is visible above bottom nav
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookItem: {
    width: '48%', // Two book boxes per row
    backgroundColor: '#2b394b',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  bookCover: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  bookTitle: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    color: 'gray',
    fontSize: 14,
  },
});
