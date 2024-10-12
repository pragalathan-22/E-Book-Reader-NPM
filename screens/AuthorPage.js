import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const AuthorPage = () => {
  const navigation = useNavigation();

  // Sample list of authors
  const authors = [
    { id: 1, name: "F. Scott Fitzgerald", imageUrl: "https://dummyimage.com/100x100/cccccc/000000&text=F.+Scott+Fitzgerald" },
    { id: 2, name: "George Orwell", imageUrl: "https://dummyimage.com/100x100/cccccc/000000&text=George+Orwell" },
    { id: 3, name: "Harper Lee", imageUrl: "https://dummyimage.com/100x100/cccccc/000000&text=Harper+Lee" },
    { id: 4, name: "J.K. Rowling", imageUrl: "https://dummyimage.com/100x100/cccccc/000000&text=J.K.+Rowling" },
    { id: 5, name: "Mark Twain", imageUrl: "https://dummyimage.com/100x100/cccccc/000000&text=Mark+Twain" },
    // Add more authors as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authors</Text>
      <ScrollView contentContainerStyle={styles.authorsContainer}>
        {authors.map((author) => (
          <TouchableOpacity 
            key={author.id} 
            style={styles.authorProfile} 
            onPress={() => navigation.navigate('AuthorBooksScreen', { authorName: author.name })} // Navigate to AuthorBooksScreen
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
    justifyContent: "space-between", // Change to space-between for better spacing
  },
  authorProfile: {
    alignItems: "center",
    marginBottom: 20,
    width: '30%', // Set width to approximately 30% to fit three in a row
    marginHorizontal: '1.5%', // Add horizontal margin for spacing
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
    textAlign: 'center', // Center the text
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
