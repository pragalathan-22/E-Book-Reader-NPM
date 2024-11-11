import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BookContext } from '../context/BookContext';
import { useNavigation } from '@react-navigation/native';

const LibraryScreen = () => {
    const { savedBooks } = useContext(BookContext);
    const navigation = useNavigation();

    const handleBookPress = (book) => {
        navigation.navigate('PlayScreen', { book });
    };

    return (
        <LinearGradient colors={["#212f3d", "#212f3d"]} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.header}>Your E-Book Library</Text>
                    {savedBooks.length > 0 ? (
                        <View style={styles.booksContainer}>
                            {savedBooks.map((book, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={styles.bookItem} 
                                    onPress={() => handleBookPress(book)}
                                >
                                    {book.bookImage ? (
                                        <Image source={{ uri: book.bookImage }} style={styles.bookCover} />
                                    ) : (
                                        <View style={styles.placeholderImage} />
                                    )}
                                    <View style={styles.bookDetails}>
                                        <Text style={styles.bookTitle}>{book.bookName || 'Untitled'}</Text>
                                        <Text style={styles.bookAuthor}>{book.authorName || 'Unknown Author'}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.noBooksText}>No saved books yet!</Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default LibraryScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    header: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    booksContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Adjusts spacing between books
    },
    bookItem: {
        width: '30%', // Adjusted to allow three items per row
        marginBottom: 15,
        backgroundColor: '#2d3748', // Dark background for book item
        borderRadius: 5,
        padding: 5, // Reduced padding for smaller size
        elevation: 2, // Add shadow effect
    },
    bookCover: {
        width: '100%', // Full width of the item
        height: 150, // Reduced height for smaller size
        borderRadius: 5,
    },
    placeholderImage: {
        width: '100%',
        height: 150, // Match the height of bookCover
        borderRadius: 5,
        backgroundColor: '#gray', // Placeholder background
    },
    bookDetails: {
        marginTop: 5, // Space between the image and text
    },
    bookTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14, // Reduced font size
    },
    bookAuthor: {
        color: '#94a3b8',
        fontSize: 12, // Reduced font size
    },
    noBooksText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
});
