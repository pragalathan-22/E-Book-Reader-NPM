import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImportScreen = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Define the folder and file path
  const dataFolderPath = FileSystem.documentDirectory + 'data/';
  const jsonFilePath = dataFolderPath + 'bookFiles.json'; // Path for JSON file

  // Ensure the data directory exists
  const ensureDirectoryExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(dataFolderPath);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dataFolderPath, { intermediates: true });
    }
  };

  // Function to load the existing files from AsyncStorage and JSON file
  const loadFiles = async () => {
    try {
      // Load from AsyncStorage
      const storedFiles = await AsyncStorage.getItem('bookFiles');
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles)); // Parse and set files if they exist
      }

      // Load from JSON file
      await ensureDirectoryExists(); // Ensure the directory exists before loading
      const fileInfo = await FileSystem.getInfoAsync(jsonFilePath);
      if (fileInfo.exists) {
        const fileData = await FileSystem.readAsStringAsync(jsonFilePath);
        const existingFiles = JSON.parse(fileData);
        setFiles((prevFiles) => [...prevFiles, ...existingFiles]); // Combine files from both sources
      }
    } catch (error) {
      console.log('Error loading files:', error);
    }
  };

  useEffect(() => {
    loadFiles(); // Load files when the component mounts
  }, []);

  // Function to pick files (EPUB, PDF, MOBI)
  const handleImportFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook'],
    });

    if (result.type === 'success' && result.assets && result.assets.length > 0) {
      const file = result.assets[0]; // Get the first file from assets array
      const newFile = { name: file.name, uri: file.uri, size: file.size }; // Extract file metadata

      const updatedFiles = [...files, newFile]; // Add the new file to the existing files
      setFiles(updatedFiles); // Update the state

      // Save or update the files in AsyncStorage
      setLoading(true); // Set loading to true when starting the file save
      try {
        // Save to AsyncStorage
        await AsyncStorage.setItem('bookFiles', JSON.stringify(updatedFiles));
        console.log('Files saved in AsyncStorage'); // Log confirmation

        // Save to JSON file
        await FileSystem.writeAsStringAsync(jsonFilePath, JSON.stringify(updatedFiles), {
          encoding: FileSystem.EncodingType.UTF8,
        });
        console.log('File saved at:', jsonFilePath); // Log where the JSON file is saved
      } catch (error) {
        console.log('Error saving files:', error);
      }
      setLoading(false); // Set loading to false after file save is complete
    }
  };

  return (
    <LinearGradient colors={['#334155', '#131624']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Header */}
          <Text style={styles.header}>Import Your Books</Text>

          {/* File Import Section */}
          <Pressable style={styles.importButton} onPress={handleImportFiles}>
            <Text style={styles.buttonText}>Import EPUB, PDF, MOBI</Text>
          </Pressable>

          {/* Loading Indicator */}
          {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />}

          {/* Displaying Selected Files */}
          <View style={styles.filesContainer}>
            {files.length > 0 ? (
              files.map((file, index) => (
                <View key={index} style={styles.fileBox}>
                  <Text style={styles.fileText}>{file.name}</Text> {/* Display the file name */}
                  <Text style={styles.uriText}>{file.uri}</Text>  {/* Display the file URI */}
                </View>
              ))
            ) : (
              <Text style={styles.noFilesText}>No files selected.</Text>
            )}
          </View>

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
    backgroundColor: '#ffffff',
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
  },
  fileText: {
    color: '#333',
    fontWeight: 'bold',
  },
  uriText: {
    color: '#666',
  },
  noFilesText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ImportScreen;
