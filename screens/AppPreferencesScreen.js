import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const AppPreferencesScreen = () => {
  return (
    <LinearGradient colors={['#334155', '#131624']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Welcome to Your E-Book Companion</Text>
          <Text style={styles.contentText}>
            Dive into a world where reading meets listening! Our E-Book Reader application is designed for those who love to immerse themselves in stories, whether through reading or listening. With our intuitive design, you can switch between reading and audio mode effortlessly, making it the perfect companion for book lovers on the go.
          </Text>
          <Text style={styles.sectionTitle}>Listen to Stories Like Music</Text>
          <Text style={styles.contentText}>
            Experience your favorite books as if they were songs. Our "Listen Mode" allows you to play stories in the background, just like your favorite playlist. Perfect for long commutes, relaxing at home, or whenever you want to enjoy a good story hands-free.
          </Text>
          <Text style={styles.sectionTitle}>Discover New Authors</Text>
          <Text style={styles.contentText}>
            Browse through a wide range of author collections and dive into their unique worlds. Whether you're a fan of mystery, romance, sci-fi, or classic literature, you'll find new books to explore and enjoy.
          </Text>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.contentText}>
            At our core, we're a team of passionate book enthusiasts dedicated to making reading more accessible and enjoyable for everyone. Our mission is to create a seamless reading experience, allowing you to enjoy your favorite stories wherever life takes you.
          </Text>
          <Text style={styles.contentText}>
            We believe in the power of stories and the magic they bring to life. Join us in our journey to make reading and listening an unforgettable adventure!
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  contentText: {
    color: '#d1d5db',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 15,
  },
});
