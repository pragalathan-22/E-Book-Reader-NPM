import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { booksData } from "../data/books"; // Replace with actual path

const SearchResultsScreen = ({ navigation }) => { // Added navigation prop
  const route = useRoute();
  const { query } = route.params;
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (query) {
      const results = booksData.filter((book) =>
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
              <TouchableOpacity
                key={index}
                style={styles.bookCard}
                onPress={() => navigation.navigate('PlayScreen', { book })} // Navigate to PlayScreen
              >
                <View style={styles.bookShape}>
                  <Image
                    source={{ uri: book.image }}
                    style={styles.bookImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookDescription}>
                    {book.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              No books found for "{query}".
            </Text>
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
    marginBottom: 20,
    marginTop: 30,
  },
  resultsContainer: {
    paddingVertical: 20,
    alignItems: "center", // Center the book cards
  },
  bookCard: {
    marginBottom: 20,
    alignItems: "center", // Center the book shape within the card
  },
  bookShape: {
    width: 150, // Adjust width to give a "book" feel
    height: 280, // Adjusted height to accommodate image and text
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center", // Center items inside the bookShape
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Adds depth to give it a "book" look
  },
  bookImage: {
    width: 120, // Width of the image
    height: 160, // Height of the image
    borderRadius: 5, // Rounded corners for the image
    marginBottom: 10, // Space between image and title
  },
  bookTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
  bookDescription: {
    fontSize: 12,
    color: "#b0b0b0",
    marginTop: 5,
    textAlign: "center",
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
