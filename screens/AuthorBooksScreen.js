import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AuthorBooksScreen = ({ route }) => {
  const { authorName } = route.params; // Destructure authorName from route.params

  // Sample list of books for demonstration
  const books = [
    { id: 1, title: "Book 1 by " + authorName },
    { id: 2, title: "Book 2 by " + authorName },
    { id: 3, title: "Book 3 by " + authorName },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books by {authorName}</Text>
      <ScrollView>
        {books.map((book) => (
          <Text key={book.id} style={styles.bookTitle}>{book.title}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#334155",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
  },
  bookTitle: {
    color: "#ffffff",
    fontSize: 18,
    marginVertical: 10,
  },
});

export default AuthorBooksScreen;
