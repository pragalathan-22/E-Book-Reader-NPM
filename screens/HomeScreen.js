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
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { booksData } from '../data/books'; // Import your books data

const HomeScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books

  // Function to handle search
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() !== "") {
      const filtered = booksData.filter((book) =>
        book.title.toLowerCase().includes(text.toLowerCase()) || // Filter by title
        book.author.toLowerCase().includes(text.toLowerCase()) // Filter by author
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  // Function to handle book selection from auto-suggestions
  const handleBookSelect = (book) => {
    navigation.navigate("PlayScreen", { book });
    setSearchText(""); // Clear search text after selection
    setFilteredBooks([]); // Clear filtered books after selection
  };

  return (
    <LinearGradient colors={["#334155", "#131624"]} style={styles.gradient}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header Section with Search and Menu */}
            <View style={styles.header}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for books..."
                placeholderTextColor="white"
                value={searchText}
                onChangeText={handleSearch} // Update search text and filter books
                onSubmitEditing={() => {
                  if (filteredBooks.length > 0) {
                    handleBookSelect(filteredBooks[0]); // Select the first filtered book on "Enter"
                  }
                }}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                  if (filteredBooks.length > 0) {
                    handleBookSelect(filteredBooks[0]); // Select the first filtered book when the button is pressed
                  }
                }}
              >
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Auto-suggest results */}
            {searchText.length > 0 && (
              <FlatList
                data={filteredBooks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleBookSelect(item)}
                  >
                    <Text style={styles.suggestionText}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionList}
              />
            )}

            {/* Scrollable Content Section */}
            <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 80 }]}>
              {/* Scrollable Authors Section */}
              <Text style={styles.sectionTitle}>Authors</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.authorsContainer}
                style={{ paddingHorizontal: 16 }}
                decelerationRate="fast"
              >
                {booksData.map((book) => (
                  <AuthorProfile 
                    key={book.id}
                    name={book.author}
                    authorImage={book.authorImage} // Pass the author's image URL
                    onPress={() => navigation.navigate('AuthorBooksScreen', { authorName: book.author })} // Navigate to AuthorBooksScreen
                  />
                ))}

                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("AuthorPage")}
                >
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Scrollable Trending Clips Section */}
              <Text style={styles.sectionTitle}>Trending Clips</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.clipContainer}
              >
                {booksData.slice(0, 4).map((book, index) => (
                  <ClipCard 
                    key={index} 
                    title={book.title} 
                    image={book.image} 
                    book={book} // Pass the book object to ClipCard
                    navigation={navigation} // Pass navigation object to ClipCard
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("SeeMore")}
                >
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Scrollable Suggestions Section */}
              <Text style={styles.sectionTitle}>Suggestions</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.clipContainer}
              >
                {booksData.slice(0, 4).map((book, index) => (
                  <ClipCard 
                    key={index} 
                    title={book.title} 
                    image={book.image} 
                    book={book} // Pass the book object to ClipCard
                    navigation={navigation} // Pass navigation object to ClipCard
                  />
                ))}

                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("SeeMore")}
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
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.cardCover}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
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
    paddingHorizontal: 16,
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
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    width: 120,
    height: 250,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderRadius: 8,
  },
  cardCover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  cardTitle: {
    fontSize: 18, // Increased font size for the title
    color: "#ffffff",
    textAlign: "center", // Center-aligned text
  },
  seeMoreButton: {
      backgroundColor: "#2b394b",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 10,
    },
    seeMoreText: {
      color: "#ffffff",
      fontWeight: "600",
    },

  suggestionsContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    maxHeight: 150,
    marginTop: 10,
    position: "absolute",
    zIndex: 1000,
    width: "100%",
  },
  suggestionItem: {
    padding: 10,
  },
  suggestionText: {
    color: "#ffffff",
  },
});
