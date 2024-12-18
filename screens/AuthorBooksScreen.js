import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../services/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const AuthorBooksScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { authorName } = route.params;
  const [books, setBooks] = useState([]);

  const fetchBooksByAuthor = async () => {
    const booksCollection = collection(db, 'books');
    const q = query(booksCollection, where("authorName", "==", authorName));
    const booksSnapshot = await getDocs(q);
    const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setBooks(booksList);
  };

  useEffect(() => {
    fetchBooksByAuthor();
  },);

  const handleBookPress = (book) => {
    navigation.navigate('PlayScreen', { book });
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <LinearGradient colors={["#212f3d", "#212f3d"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Books by {authorName}</Text>
        <ScrollView contentContainerStyle={styles.booksContainer}>
          {books.map((book, index) => (
            <TouchableOpacity key={index} style={styles.bookItem} onPress={() => handleBookPress(book)}>
              <Image source={{ uri: book.bookImage }} style={styles.bookImage} />
              <View style={styles.textContainer}>
                <Text style={styles.bookTitle}>{book.bookName}</Text>
                <Text style={styles.bookDescription}>{truncateDescription(book.description, 30)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity> */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    marginTop:28,
  },
  booksContainer: {
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: "row",
    backgroundColor: "#2b394b",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  bookTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  bookDescription: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 10,
  },
});

export default AuthorBooksScreen;
