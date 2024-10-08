import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

// Sample data for different clip categories
const savedClips = [
  { id: 1, title: "Saved Clip 1", description: "Description of Saved Clip 1" },
  { id: 2, title: "Saved Clip 2", description: "Description of Saved Clip 2" },
];

const recentlyLikedClips = [
  { id: 1, title: "Liked Clip 1", description: "Description of Liked Clip 1" },
  { id: 2, title: "Liked Clip 2", description: "Description of Liked Clip 2" },
];

const wordsHighlightClips = [
  { id: 1, title: "Highlight Clip 1", description: "Description of Highlight Clip 1" },
  { id: 2, title: "Highlight Clip 2", description: "Description of Highlight Clip 2" },
];

const localClips = [
  { id: 1, title: "Local Clip 1", description: "Description of Local Clip 1" },
  { id: 2, title: "Local Clip 2", description: "Description of Local Clip 2" },
];

const LibraryScreen = () => {
  return (
    <LinearGradient colors={["#334155", "#131624"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        {/* Scrollable Book List */}
        <ScrollView contentContainerStyle={styles.bookList}>
          <Section title="Saved Clips" clips={savedClips} />
          <Section title="Recently Liked Clips" clips={recentlyLikedClips} />
          <Section title="Words Highlight Clips" clips={wordsHighlightClips} />
          <Section title="Local Clips" clips={localClips} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

// Section component for rendering different categories of clips
const Section = ({ title, clips }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {clips.map((clip) => (
          <ClipCard key={clip.id} clip={clip} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreText}>See More</Text>
      </TouchableOpacity>
    </View>
  );
};

// ClipCard component for reusable clip design
const ClipCard = ({ clip }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{clip.title}</Text>
      <Text style={styles.cardDescription}>{clip.description}</Text>
    </TouchableOpacity>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 16,
  },
  bookList: {
    paddingTop: 20, // Added padding to bring down the content
    paddingBottom: 80, // Add bottom padding to avoid clipping
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 150, // Adjusted for horizontal scrolling
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#b0b0b0",
    fontSize: 12,
  },
  seeMoreButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#1e293b",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  seeMoreText: {
    color: "#ffffff",
    fontSize: 14,
  },
});
