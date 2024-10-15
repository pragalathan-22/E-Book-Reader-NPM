import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

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

          {/* User Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Your Statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>120</Text>
                <Text style={styles.statLabel}>Books Read</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Current Reading</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber} onPress={() => navigation.navigate("SavedBooks")}>32</Text>
                <Text style={styles.statLabel}>Saved Books</Text>
              </View>
            </View>
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
             {/* Saved Settings */}
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('SavedBooks')}>
              <Text style={styles.optionText}>Saved Books</Text>
            </TouchableOpacity>
            {/* Account Settings */}
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Account Settings</Text>
            </TouchableOpacity>
            {/* App Preferences */}
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>App Preferences</Text>
            </TouchableOpacity>
            {/* Help & Support */}
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Help & Support</Text>
            </TouchableOpacity>
            {/* History */}
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>History</Text>
            </TouchableOpacity>
            {/* Logout */}
            <TouchableOpacity style={styles.optionItem}>
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: 'gray',
    fontSize: 14,
  },
  profileInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  editButton: {
    color: '#007bff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  uploadButton: {
    color: '#007bff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  recentSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookItem: {
    marginRight: 20,
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  bookTitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  bookAuthor: {
    color: 'gray',
    fontSize: 10,
  },
  statsSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'gray',
    fontSize: 12,
  },
  optionsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: 'lightgray',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fullImageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  fullImageModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
  },
});
