import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { auth } from '../services/firebase'; // Ensure this is the correct path to your Firebase setup
import { signOut } from 'firebase/auth'; // Import the signOut function

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Prag');
  const [email, setEmail] = useState('abc.com');
  const [modalVisible, setModalVisible] = useState(false); // Modal for editing
  const [fullImageModalVisible, setFullImageModalVisible] = useState(false); // Modal for full-size image

  const navigation = useNavigation(); // Hook to navigate

  const recentlySavedBooks = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://via.placeholder.com/100' },
    { title: '1984', author: 'George Orwell', cover: 'https://via.placeholder.com/100' },
    { title: 'Moby Dick', author: 'Herman Melville', cover: 'https://via.placeholder.com/100' }
  ];

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setModalVisible(false); // Close modal after image selection
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const openModal = () => {
    setModalVisible(true); // Open modal on image click
  };

  const openFullImageModal = () => {
    setFullImageModalVisible(true); // Open full-size image modal
  };

  // Function to handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Ensure you navigate to the Login screen or any other screen
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

          {/* Recently Saved Books */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Books</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {recentlySavedBooks.map((book, index) => (
                <View key={index} style={styles.bookItem}>
                  <Image source={{ uri: book.cover }} style={styles.bookCover} />
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Additional Options */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Settings</Text>
            {/* Account Settings */}
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('')}>
              <Text style={styles.optionText}>Account Settings</Text>
            </TouchableOpacity>
            {/* App Preferences */}
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('AppPreferencesScreen')}>
              <Text style={styles.optionText}>App Preferences</Text>
            </TouchableOpacity>
            {/* Help & Support */}
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('HelpSupport')}>
              <Text style={styles.optionText}>Help & Support</Text>
            </TouchableOpacity>
            {/* History */}
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('')}>
              <Text style={styles.optionText}>History</Text>
            </TouchableOpacity>
            {/* Logout */}
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
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
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
        onRequestClose={() => setFullImageModalVisible(false)} // Close modal on back press
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
}

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
  statsSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'lightgray',
    fontSize: 16,
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
    fontSize: 18, // Increased font size for options
    lineHeight: 24, // Added line height for better spacing
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fullImageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
