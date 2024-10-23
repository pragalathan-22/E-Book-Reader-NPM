import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const PlayScreen = () => {
  const route = useRoute();
  const { book } = route.params; // Get the book data from the route params

  return (
    <View style={styles.container}>
      {/* Display book details */}
      <Image source={{ uri: book.bookImage }} style={styles.image} />
      <Text style={styles.title}>{book.bookName}</Text>
      <Text style={styles.author}>{book.authorName}</Text>
      <Text style={styles.description}>{book.description}</Text>
      {/* Add other book details you want to display */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#131624",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
    marginVertical: 10,
  },
  author: {
    fontSize: 18,
    color: "#ffffff",
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 10,
  },
});

export default PlayScreen;
