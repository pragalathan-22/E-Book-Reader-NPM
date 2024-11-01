import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navigation from './StackNavigator'; // Ensure this is the correct path to your navigator
import { BookProvider } from './context/BookContext'; // Adjust the path as needed
import { ThemeProvider } from './context/ThemeContext'; // Adjust the path as needed
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <ThemeProvider>
            <BookProvider>
                <NavigationContainer>
                    <Navigation />
                    <StatusBar style="auto" />
                </NavigationContainer>
            </BookProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
