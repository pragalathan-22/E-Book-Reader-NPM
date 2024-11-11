import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, Image, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../services/firebase'; // Import Firebase Firestore configuration
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const SuggestionScreen = ({ navigation }) => {
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from Firebase ordered by suggestionCount
  useEffect(() => {
    const fetchSuggestedBooks = async () => {
      try {
        const q = query(collection(db, 'books'), orderBy('suggestionCount', 'desc'));
        const querySnapshot = await getDocs(q);
        const books = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSuggestedBooks(books);
      } catch (error) {
        console.error('Error fetching suggested books: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedBooks();
  }, []);

  // Render each book item with image on the left and title on the right
  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('PlayScreen', { book: item })} // Navigate to PlayScreen with book data
    >
      <Image source={{ uri: item.bookImage }} style={styles.bookCover} />
      <Text style={styles.bookTitle}>{item.bookName}</Text>
    </TouchableOpacity>
  );

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
        {/* Back Button */}
        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity> */}

        <FlatList
          key={'single-column'} // Unique key for single-column layout
          data={suggestedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
          numColumns={1} // Display one item per row
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

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
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
    marginTop:20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131624',
  },
  bookItem: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center',
    backgroundColor: '#2b394b',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookCover: {
    width: 60, // Fixed width for the book cover
    height: 90, // Fixed height for the book cover
    borderRadius: 5,
    marginRight: 10, // Space between image and text
  },
  bookTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1, // Allow title to wrap if needed
  },
});

export default SuggestionScreen;
