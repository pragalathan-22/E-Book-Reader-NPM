import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../services/firebase'; // Import the Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

const SeeMoreScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from Firestore on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books')); // Replace 'books' with your Firestore collection name
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#212f3d", "#212f3d"]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.booksContainer}>
            {books.map((book) => (
              <TouchableOpacity
                key={book.id}
                style={styles.bookItem}
                onPress={() => navigation.navigate('PlayScreen', { book })} // Pass the entire book object
              >
                <Image source={{ uri: book.bookImage }} style={styles.bookCover} resizeMode="cover" />
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{book.bookName}</Text>
                  {/* <Text style={styles.bookAuthor}>{book.description}</Text> */}
                </View>
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
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Ensure content is visible above bottom nav
  },
  booksContainer: {
    flexDirection: 'column', // Arrange items in a column
    justifyContent: 'flex-start',
  },
  bookItem: {
    flexDirection: 'row', // Align image and text in a row
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
    width: 60, // Fixed width for the book cover
    height: 90, // Fixed height for the book cover
    borderRadius: 5,
    marginRight: 10, // Space between image and text
  },
  bookInfo: {
    flex: 1, // Allow text to take the remaining space
  },
  bookTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 36, // Try increasing line height (e.g., 36 or more)
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131624',
  },
});
