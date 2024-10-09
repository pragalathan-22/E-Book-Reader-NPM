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
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const HomeScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [searchText, setSearchText] = useState("");

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
              <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="menu" size={30} color="white" />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="white"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

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
                <AuthorProfile name="Author 1" />
                <AuthorProfile name="Author 2" />
                <AuthorProfile name="Author 3" />
                <AuthorProfile name="Author 4" />
                <AuthorProfile name="Author 5" />

                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("SeeMore")} // Add onPress to navigate
                >
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              </ScrollView>

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

                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => navigation.navigate("SeeMore")}
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
                <ClipCard title="Trending Clip 1" />
                <ClipCard title="Trending Clip 2" />
                <ClipCard title="Trending Clip 3" />
                <ClipCard title="Trending Clip 4" />

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
                <ClipCard title="Suggested Book 1" />
                <ClipCard title="Suggested Book 2" />
                <ClipCard title="Suggested Book 3" />
                <ClipCard title="Suggested Book 4" />

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
const AuthorProfile = ({ name }) => {
  return (
    <View style={styles.authorProfile}>
      <Image
        source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }} // Replace with actual author image URLs
        style={styles.authorImage}
      />
      <Text style={styles.authorName}>{name}</Text>
    </View>
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
    marginTop: 40,
  },
  menuButton: {
    marginRight: 10,
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
    height: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardCover: {
    backgroundColor: "#2b394b",
    borderRadius: 6,
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
    textAlign: "center",
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
});
