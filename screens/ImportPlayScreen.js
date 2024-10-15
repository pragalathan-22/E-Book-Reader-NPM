import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const ImportPlayScreen = () => {
  const route = useRoute();
  const { fileUri } = route.params; // Get the file URI from the route params

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Playing File</Text>
      <View style={styles.content}>
        <Text style={styles.fileText}>File URI: {fileUri}</Text>
        {/* Here you can implement the logic to render the PDF or EPUB content */}
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
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
  },
  fileText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImportPlayScreen;
