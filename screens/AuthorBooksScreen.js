import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { booksData } from "../data/books"; // Update with the correct path

const AuthorBooksScreen = ({ route, navigation }) => {
  const { authorName } = route.params;

  // Filter books by the selected author
  const authorBooks = booksData.filter(book => book.author === authorName);

  return (
    <LinearGradient colors={['#334155', '#131624']} style={styles.container}>
      <Text style={styles.title}>{authorName}'s Books</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {authorBooks.length > 0 ? (
          authorBooks.map(book => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookContainer}
              onPress={() => navigation.navigate('PlayScreen', { book })}  // Navigate to PlayScreen with the book data
            >
              <Image source={{ uri: book.image }} style={styles.bookImage} />
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookDescription}>{book.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noBooksText}>No books found for this author.</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space at the bottom for padding
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 40, // Adjusted margin to move the title down
    marginBottom: 20, // Space between the title and books list
    color: "white", // Same title color as SeeMoreScreen
  },
  bookContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#2b394b", // Match background color with SeeMoreScreen
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  bookDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Title text color white
  },
  bookDescription: {
    color: "#ccc", // Lighter description text color
  },
  noBooksText: {
    color: "white", // Color for no books message, same as SeeMoreScreen
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default AuthorBooksScreen;
