// components/BookPlayer.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BookPlayer = ({ bookName, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.bookName}>{bookName}</Text>
            </TouchableOpacity>
            {/* Add controls here, e.g., play/pause buttons */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    bookName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BookPlayer;
