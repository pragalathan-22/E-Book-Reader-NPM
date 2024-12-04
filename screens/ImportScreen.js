import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation

const ImportScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define the folder and file path
  const dataFolderPath = FileSystem.documentDirectory + 'data/';
  const jsonFilePath = dataFolderPath + 'bookFiles.json';

  const ensureDirectoryExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(dataFolderPath);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dataFolderPath, { intermediates: true });
    }
  };

  const loadFiles = async () => {
    try {
      const storedFiles = await AsyncStorage.getItem('bookFiles');
      const allFiles = new Set(); // Use a Set to avoid duplicates

      if (storedFiles) {
        const parsedFiles = JSON.parse(storedFiles);
        parsedFiles.forEach(file => allFiles.add(JSON.stringify(file))); // Add files to the Set
      }

      await ensureDirectoryExists();
      const fileInfo = await FileSystem.getInfoAsync(jsonFilePath);
      if (fileInfo.exists) {
        const fileData = await FileSystem.readAsStringAsync(jsonFilePath);
        const existingFiles = JSON.parse(fileData);
        existingFiles.forEach(file => allFiles.add(JSON.stringify(file))); // Add files from JSON
      }

      // Convert the Set back to an array and update the state
      setFiles(Array.from(allFiles).map(file => JSON.parse(file)));
    } catch (error) {
      console.log('Error loading files:', error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, );

  const handleImportFiles = async () => {
    console.log("Opening Document Picker..."); // Debug log
    const result = await DocumentPicker.getDocumentAsync({
      type: 'text/plain', // Only accept .txt files
      copyToCacheDirectory: true, // Optionally copy the document to the cache directory
    });

    console.log("Document Picker Result:", result); // Debug log

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      const newFile = { name: file.name, uri: file.uri, size: file.size };

      // Check if the file already exists
      const fileExists = files.some(existingFile => existingFile.uri === newFile.uri);

      if (!fileExists) {
        setLoading(true);
        try {
          const updatedFiles = [...files, newFile];
          console.log('New file added:', newFile); // Debug log

          // Save to AsyncStorage and JSON file
          await AsyncStorage.setItem('bookFiles', JSON.stringify(updatedFiles));
          await FileSystem.writeAsStringAsync(jsonFilePath, JSON.stringify(updatedFiles), {
            encoding: FileSystem.EncodingType.UTF8,
          });

          console.log('Files saved successfully!'); // Debug log
          loadFiles(); // Refresh files after saving
        } catch (error) {
          console.log('Error saving files:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('File already exists:', newFile.name); // Debug log
      }
    } else {
      console.log('File selection was canceled or failed.'); // Debug log
    }
  };

  const openFile = (uri) => {
    navigation.navigate('ImportPlayScreen', { fileUri: uri }); // Navigate to ImportPlayScreen with file URI
  };

  const handleDeleteFile = async (uri) => {
    const updatedFiles = files.filter(file => file.uri !== uri);
    setFiles(updatedFiles); // Update state

    // Save updated file list to AsyncStorage and JSON file
    await AsyncStorage.setItem('bookFiles', JSON.stringify(updatedFiles));
    await FileSystem.writeAsStringAsync(jsonFilePath, JSON.stringify(updatedFiles), {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log('File deleted:', uri); // Debug log
  };

  return (
    <LinearGradient colors={["#212f3d", "#212f3d"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Import Your Text Files</Text>
          <Pressable style={styles.importButton} onPress={handleImportFiles}>
            <Text style={styles.buttonText}>Import TXT Files</Text>
          </Pressable>

          {/* Loading Indicator */}
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />
          ) : (
            <View style={styles.filesContainer}>
              {files.length > 0 ? (
                files.map((file, index) => (
                  <View key={index} style={styles.fileBox}>
                    <Pressable onPress={() => openFile(file.uri)} style={styles.filePressable}>
                      <Text style={styles.fileText}>{file.name}</Text>
                      <Text style={styles.uriText}>{(file.size / 1024).toFixed(2)} KB</Text>
                    </Pressable>
                    <Pressable onPress={() => handleDeleteFile(file.uri)} style={styles.deleteButton}>
                      <Ionicons name="trash-outline" size={24} color="white" />
                    </Pressable>
                  </View>
                ))
              ) : (
                <Text style={styles.noFilesText}>No files selected.</Text>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  importButton: {
    backgroundColor: '#94a3b8',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingIndicator: {
    marginBottom: 20,
  },
  filesContainer: {
    marginTop: 20,
  },
  fileBox: {
    backgroundColor: '#1e293b', // Lighter color for the file box
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to the left and right
    alignItems: 'center',
  },
  filePressable: {
    flex: 1, // Allow this to take up space
    marginRight: 10, // Space between file text and delete button
  },
  fileText: {
    color: '#ffffff', // Change text color for contrast
    fontWeight: 'bold',
  },
  uriText: {
    color: '#d1d5db', // Lighter color for file size
  },
  deleteButton: {
    padding: 5,
  },
  noFilesText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ImportScreen;
