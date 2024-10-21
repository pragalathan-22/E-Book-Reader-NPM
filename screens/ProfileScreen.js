import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { BookContext } from '../context/BookContext'; // Ensure this is the correct path to your BookContext

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Prag');
  const [email, setEmail] = useState('abc.com');
  const [modalVisible, setModalVisible] = useState(false);
  const [fullImageModalVisible, setFullImageModalVisible] = useState(false);
  
  const navigation = useNavigation();
  
  // Accessing the BookContext
  const { recentlyPlayedBooks, addToRecentlyPlayed } = useContext(BookContext);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const openFullImageModal = () => {
    setFullImageModalVisible(true);
  };

  const playBook = (book) => {
    addToRecentlyPlayed(book);
    Alert.alert("Now Playing", `You are now playing ${book.title}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
      Alert.alert("Logged Out", "You have successfully logged out.");
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#334155", "#131624"]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Profile Information */}
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={openFullImageModal}>
              <Image 
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.profileInput}
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.profileInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </>
            ) : (
              <>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileEmail}>{email}</Text>
              </>
            )}
            <TouchableOpacity onPress={toggleEditMode}>
              <Text style={styles.editButton}>
                {isEditing ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.uploadButton}>Upload Image</Text>
            </TouchableOpacity>
          </View>

          {/* Recently Played Books */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Books</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {recentlyPlayedBooks.map((book, index) => (
                <View key={index} style={styles.bookItem}>
                  <TouchableOpacity onPress={() => playBook(book)}>
                    <Image source={{ uri: book.image }} style={styles.bookCover} />
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Additional Options */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('')}>
              <Text style={styles.optionText}>Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('AppPreferencesScreen')}>
              <Text style={styles.optionText}>App Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('HelpSupport')}>
              <Text style={styles.optionText}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('')}>
              <Text style={styles.optionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
              <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </LinearGradient>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={pickImage}>
              <Image 
                source={{ uri: profileImage }}
                style={styles.modalProfileImage}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.modalInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email"
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Full-Size Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={fullImageModalVisible}
        onRequestClose={() => setFullImageModalVisible(false)}
      >
        <View style={styles.fullImageModalContainer}>
          <TouchableOpacity onPress={() => setFullImageModalVisible(false)} style={styles.fullImageModalBackground}>
            <Image 
              source={{ uri: profileImage }}
              style={styles.fullImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100, // Add padding to ensure content is visible above the bottom nav
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20, // Add margin to lower the profile section
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  profileInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
  },
  editButton: {
    color: 'grey',
    marginBottom: 10,
  },
  uploadButton: {
    color: 'grey',
  },
  recentSection: {
    marginBottom: 30,
  },
  bookItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginBottom: 5,
  },
  bookTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookAuthor: {
    color: 'lightgray',
    textAlign: 'center',
  },
  optionsSection: {
    marginBottom: 30,
  },
  optionItem: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
  },
  fullImageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullImageModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, // Adjusted margin
  },
});
