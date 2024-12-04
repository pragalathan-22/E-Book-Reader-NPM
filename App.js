import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './StackNavigator'; 
import { BookProvider } from './context/BookContext'; 
import { ThemeProvider } from './context/ThemeContext';
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
