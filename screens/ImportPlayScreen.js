import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { useRoute } from '@react-navigation/native';

const ImportPlayScreen = () => {
  const route = useRoute();
  const { fileUri } = route.params; // Get the file URI from the route params
  const [fileContent, setFileContent] = useState(''); // State to store file content
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const loadFileContent = async () => {
      try {
        const content = await FileSystem.readAsStringAsync(fileUri);
        setFileContent(content); // Set the content to state
      } catch (error) {
        console.log('Error reading file:', error);
        setError('Error reading file.'); // Set error message
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    loadFileContent();
  }, [fileUri]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Playing File</Text>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text> // Show error message if any
        ) : (
          <Text style={styles.fileText}>{fileContent}</Text> // Display the file content
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131624',
    padding: 20,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    alignItems: 'flex-start', // Align text to the left
    width: '100%', // Take full width
  },
  fileText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left', // Align text to the left
  },
  errorText: {
    color: 'red', // Error message color
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ImportPlayScreen;
