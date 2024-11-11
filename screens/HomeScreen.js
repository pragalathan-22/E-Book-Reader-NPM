// Import necessary components and hooks
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { db } from '../services/firebase';
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);

  const fetchBooks = async () => {
    const booksCollection = collection(db, 'books');
    const booksSnapshot = await getDocs(booksCollection);
    const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooksData(booksList);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() !== "") {
      const filtered = booksData.filter((book) =>
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

  // Function to get unique authors
  const getUniqueAuthors = (books) => {
    const authorSet = new Set();
    return books.filter(book => {
      if (!authorSet.has(book.authorName)) {
        authorSet.add(book.authorName);
        return true;
      }
      return false;
    });
  };

  const uniqueAuthors = getUniqueAuthors(booksData);

  return (
    <LinearGradient colors={["#212f3d", "#212f3d"]} style={styles.gradient}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for books..."
                placeholderTextColor="white"
                value={searchText}
                onChangeText={handleSearch}
                onSubmitEditing={() => {
                  if (filteredBooks.length > 0) {
                    handleBookSelect(filteredBooks[0]);
                  }
                }}
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

            {searchText.length > 0 && (
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
            )}

            <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 80 }]}>
              <Text style={styles.sectionTitle}>Authors</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.authorsContainer}
                style={{ paddingHorizontal: 16 }}
                decelerationRate="fast"
              >
                {uniqueAuthors.slice(0, 4).map((book) => (
                  <AuthorProfile 
                    key={book.id}
                    name={book.authorName}
                    authorImage={book.authorImage}
                    onPress={() => navigation.navigate('AuthorBooksScreen', { authorName: book.authorName })}
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("AuthorPage")}
                >
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              </ScrollView>

              <Text style={styles.sectionTitle}>All Books</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.clipContainer}
              >
                {booksData.slice(0, 4).map((book, index) => (
                  <ClipCard 
                    key={index} 
                    title={book.bookName} 
                    image={book.bookImage} 
                    book={book}
                    navigation={navigation}
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("SeeMore")}
                >
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              </ScrollView>

              <Text style={styles.sectionTitle}>Suggestions</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.clipContainer}
              >
                {booksData.slice(0, 4).map((book, index) => (
                  <ClipCard 
                    key={index} 
                    title={book.bookName} 
                    image={book.bookImage} 
                    book={book}
                    navigation={navigation}
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate('Suggestions')} 
                >
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

// AuthorProfile component for displaying circular author images
const AuthorProfile = ({ name, authorImage, onPress }) => {
  return (
    <TouchableOpacity style={styles.authorProfile} onPress={onPress}>
      <Image
        source={{ uri: authorImage }} // Use the author's image URL passed as a prop
        style={styles.authorImage}
      />
      <Text style={styles.authorName}>{name}</Text>
    </TouchableOpacity>
  );
};

// ClipCard component for reusable card design
const ClipCard = ({ title, image, book, navigation }) => {
  const handlePress = () => {
    navigation.navigate("PlayScreen", { book }); // Navigate to PlayScreen with book data
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <LinearGradient
        colors={["transparent","transparent", "#abb2b9"]} // Gradient colors for the ClipCard
        style={styles.cardGradient}
      >
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.cardCover}>
          <Text
            style={styles.cardTitle}
            numberOfLines={2} // Limit to 2 lines
            ellipsizeMode="tail" // Show ellipses at the end if text overflows
          >
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
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
  sectionTitle: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "700",
    marginVertical: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  clipContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  authorProfile: {
    alignItems: "center",
    marginRight: 20,
  },
  authorImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  authorName: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
  seeMoreButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  seeMoreText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: "#1e293b",
    borderRadius: 5,
    marginVertical: 5,
  },
  suggestionText: {
    color: "#ffffff",
  },
  suggestionList: {
    maxHeight: 200, // Increase this value to your desired height
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: "#1e293b",
  },

  card: {
    borderRadius: 8,
    marginRight: 10,
    width: 120,
    height: 240,

  },
  cardGradient: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderRadius: 8,
    marginTop: 5,
    elevation: 5,
  },
  cardCover: {
    padding: 5,
  },
  cardTitle: {
    color: "#ffffff",
    fontWeight: "500",
    textAlign: "center",
  },
});
