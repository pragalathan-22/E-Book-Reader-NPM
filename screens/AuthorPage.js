import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from '../services/firebase'; // Ensure you have the correct path for your firebase config
import { collection, getDocs } from "firebase/firestore";

const AuthorPage = () => {
  const navigation = useNavigation();
  const [authorsData, setAuthorsData] = useState([]);

  const fetchAuthors = async () => {
    const booksCollection = collection(db, 'books'); // Assuming your books data is here
    const booksSnapshot = await getDocs(booksCollection);
    const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Extract unique authors
    const uniqueAuthors = Array.from(
      new Set(booksList.map(book => book.authorName))
    ).map(authorName => {
      const book = booksList.find(book => book.authorName === authorName);
      return {
        name: authorName,
        imageUrl: book.authorImage, // Make sure you have this field in your book data
      };
    });

    setAuthorsData(uniqueAuthors);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authors</Text>
      <ScrollView contentContainerStyle={styles.authorsContainer}>
        {authorsData.map((author, index) => (
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
