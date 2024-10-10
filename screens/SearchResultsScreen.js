import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const SearchResultsScreen = () => {
  const route = useRoute(); // Access route params
  const { query } = route.params; // Get search query passed from HomeScreen
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Sample book data
  const books = [
    { title: "Book 1", description: "This is book 1" },
    { title: "Book 2", description: "This is book 2" },
    { title: "Book 3", description: "This is book 3" },
    { title: "Book 4", description: "This is book 4" },
  ];

  // Filtering books based on the search query
  useEffect(() => {
    if (query) {
      const results = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(results);
    }
  }, [query]);

  return (
    <LinearGradient colors={["#334155", "#131624"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Search Results for "{query}"</Text>

        {filteredBooks.length > 0 ? (
          <ScrollView contentContainerStyle={styles.resultsContainer}>
            {filteredBooks.map((book, index) => (
              <TouchableOpacity key={index} style={styles.bookCard}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookDescription}>{book.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No books found for "{query}".</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: 20, // Adjust this value to move the title down
    marginTop: 30,   // Added marginTop to move it further down from the top
  },
  resultsContainer: {
    paddingVertical: 20,
  },
  bookCard: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
  bookDescription: {
    fontSize: 14,
    color: "#b0b0b0",
    marginTop: 5,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});
