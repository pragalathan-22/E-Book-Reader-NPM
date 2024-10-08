import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker'; // Ensure you have this library installed

const ImportScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [sortOption, setSortOption] = useState('Recently Read');
  const [folders, setFolders] = useState([]);

  // Function to pick files (EPUB, PDF, MOBI)
  const handleImportFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook'],
    });

    if (result.type === 'success') {
      setSelectedFiles([...selectedFiles, result]);
    }
  };

  // Function to create a custom folder
  const handleCreateFolder = () => {
    if (folderName) {
      setFolders([...folders, { name: folderName }]);
      setFolderName('');
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
          
          {/* Display Selected Files */}
          <View style={styles.fileListContainer}>
            <Text style={styles.sectionTitle}>Selected Files:</Text>
            {selectedFiles.length === 0 ? (
              <Text style={styles.noFilesText}>No files selected</Text>
            ) : (
              <FlatList
                data={selectedFiles}
                renderItem={({ item }) => <Text style={styles.fileItem}>{item.name}</Text>}
                keyExtractor={(item) => item.uri}
              />
            )}
          </View>

          {/* Custom Folder Creation */}
          <View style={styles.folderSection}>
            <Text style={styles.sectionTitle}>Create a Custom Folder:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter folder name"
              placeholderTextColor="#ccc"
              value={folderName}
              onChangeText={setFolderName}
            />
            <Pressable style={styles.createFolderButton} onPress={handleCreateFolder}>
              <Text style={styles.buttonText}>Create Folder</Text>
            </Pressable>

            {/* Display Created Folders */}
            <View style={styles.foldersContainer}>
              {folders.length === 0 ? (
                <Text style={styles.noFilesText}>No folders created</Text>
              ) : (
                folders.map((folder, index) => (
                  <Text key={index} style={styles.folderItem}>{folder.name}</Text>
                ))
              )}
            </View>
          </View>

          {/* Sorting Options */}
          <View style={styles.sortSection}>
            <Text style={styles.sectionTitle}>Sort By:</Text>
            <View style={styles.sortOptions}>
              {['Author', 'Title', 'Recently Read'].map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.sortOption,
                    sortOption === option && styles.activeSortOption,
                  ]}
                  onPress={() => setSortOption(option)}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      sortOption === option && styles.activeSortOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Reading Customization Section */}
          <View style={styles.readingCustomization}>
            <Text style={styles.sectionTitle}>Reading Customization:</Text>
            <Text style={styles.customizationItem}>• Change themes and background colors</Text>
            <Text style={styles.customizationItem}>• Adjust font styles and sizes</Text>
            <Text style={styles.customizationItem}>• Customize page layouts</Text>
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
    paddingTop: 40, // Adds space at the top
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
  fileListContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noFilesText: {
    color: '#ccc',
    fontSize: 14,
  },
  fileItem: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  folderSection: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#e2e8f0',
    padding: 10,
    borderRadius: 25,
    color: '#000',
    marginBottom: 10,
  },
  createFolderButton: {
    backgroundColor: '#94a3b8',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foldersContainer: {
    marginTop: 10,
  },
  folderItem: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  sortSection: {
    marginBottom: 20,
  },
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortOption: {
    backgroundColor: '#94a3b8',
    padding: 10,
    borderRadius: 15,
  },
  activeSortOption: {
    backgroundColor: '#64748b',
  },
  sortOptionText: {
    color: 'white',
    fontWeight: '500',
  },
  activeSortOptionText: {
    fontWeight: 'bold',
  },
  readingCustomization: {
    marginBottom: 20,
  },
  customizationItem: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ImportScreen;
