import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';

const ImportScreen = () => {
  // State to hold the selected files
  const [files, setFiles] = useState([]);

  // Function to pick files (EPUB, PDF, MOBI)
  const handleImportFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook'],
    });

    console.log('Selected file:', result); // Log the result to check

    if (result.type === 'success' && result.assets) {
      const file = result.assets[0]; // Get the first file
      setFiles(prevFiles => [...prevFiles, { name: file.name, uri: file.uri }]); // Update state with the selected file
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

          {/* Displaying Selected Files */}
          <View style={styles.filesContainer}>
            {files.length > 0 ? (
              files.map((file, index) => (
                <View key={index} style={styles.fileBox}>
                  <Text style={styles.fileText}>{file.name}</Text> {/* Display the file name */}
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
    paddingTop: 60, // Increased top padding to move content down
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
  noFilesText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ImportScreen;
