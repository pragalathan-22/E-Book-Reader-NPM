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
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <LinearGradient colors={["#334155", "#131624"]} style={styles.gradient}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust for iOS header
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header Section with Search and Menu */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="menu" size={30} color="white" />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="white"
                value={searchText}
                onChangeText={setSearchText} // Update state on text change
              />
              <TouchableOpacity style={styles.profileIcon}>
                <Image
                  source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }} // Sample profile image URL
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            </View>

            {/* Scrollable Content Section */}
            <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 80 }]}>
              {/* Scrollable Recent Clips Section */}
              <Text style={styles.sectionTitle}>Recent Clips</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.clipContainer}
              >
                <ClipCard title="Clip 1" />
                <ClipCard title="Clip 2" />
                <ClipCard title="Clip 3" />
                <ClipCard title="Clip 4" />
              </ScrollView>

              {/* Scrollable Trending Clips Section */}
              <Text style={styles.sectionTitle}>Trending Clips</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.clipContainer}
              >
                <ClipCard title="Trending Clip 1" />
                <ClipCard title="Trending Clip 2" />
                <ClipCard title="Trending Clip 3" />
                <ClipCard title="Trending Clip 4" />
              </ScrollView>

              {/* Scrollable Suggestions Section */}
              <Text style={styles.sectionTitle}>Suggestions</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.clipContainer}
              >
                <ClipCard title="Suggested Book 1" />
                <ClipCard title="Suggested Book 2" />
                <ClipCard title="Suggested Book 3" />
                <ClipCard title="Suggested Book 4" />
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

// ClipCard component for reusable card design
const ClipCard = ({ title }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardCover}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>Description of {title}</Text>
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
    marginTop: 40, // Adjust this value to move the header down
  },
  menuButton: {
    marginRight: 10,
  },
  profileIcon: {
    padding: 10,
    marginLeft: "auto", // Aligns profile icon to the right
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the image circular
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
  sectionTitle: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "700",
    marginVertical: 10,
  },
  scrollContainer: {
    flexGrow: 1, // Ensures scrollable area expands correctly
  },
  clipContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1e293b", // Background color for the card
    borderRadius: 8, // Slightly curved corners
    padding: 10,
    marginRight: 10, // Space between cards
    width: 120, // Adjusted card width for a more book-like shape
    height: 200, // Increased height for a book appearance
    elevation: 5, // For Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardCover: {
    backgroundColor: "#2b394b", // Cover color for the book appearance
    borderRadius: 6, // Inner rounded corners
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 5,
  },
  cardDescription: {
    color: "#b0b0b0",
    fontSize: 14,
    textAlign: "center", // Center text description
  },
});
