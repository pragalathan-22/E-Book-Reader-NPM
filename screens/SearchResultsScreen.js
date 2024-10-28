// SearchScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooksData(booksList);
    };

    fetchBooks();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() !== "") {
      const filtered = booksData.filter(book =>
        book.bookName.toLowerCase().includes(text.toLowerCase()) ||
        book.authorName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  const handleBookSelect = (book) => {
    navigation.navigate("PlayScreen", { book });
    setSearchText("");
    setFilteredBooks([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for books..."
          placeholderTextColor="white"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            if (filteredBooks.length > 0) {
              handleBookSelect(filteredBooks[0]);
            }
          }}
        >
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleBookSelect(item)}
          >
            <Text style={styles.suggestionText}>{item.bookName}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "white",
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionList: {
    marginTop: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionText: {
    color: "#ffffff",
  },
});

export default SearchScreen;
