import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { booksData } from "../data/books"; // Import the booksData array

const AuthorPage = () => {
  const navigation = useNavigation();

  // Extract unique authors from booksData
  const uniqueAuthors = Array.from(
    new Set(booksData.map(book => book.author))
  ).map(authorName => {
    const book = booksData.find(book => book.author === authorName);
    return {
      name: authorName,
      imageUrl: book.authorImage,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authors</Text>
      <ScrollView contentContainerStyle={styles.authorsContainer}>
        {uniqueAuthors.map((author, index) => (
          <TouchableOpacity
            key={index}
            style={styles.authorProfile}
            onPress={() => navigation.navigate('AuthorBooksScreen', { authorName: author.name })}
          >
            <Image source={{ uri: author.imageUrl }} style={styles.authorImage} />
            <Text style={styles.authorName}>{author.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
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
  authorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  authorProfile: {
    alignItems: "center",
    marginBottom: 20,
    width: '30%',
    marginHorizontal: '1.5%',
  },
  authorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#ffffff",
    borderWidth: 2,
  },
  authorName: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#2b394b",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default AuthorPage;
