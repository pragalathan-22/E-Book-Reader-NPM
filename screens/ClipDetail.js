// ClipDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClipDetail = ({ route }) => {
  const { title } = route.params; // Get the title from route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>Details about {title}...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ClipDetail;
