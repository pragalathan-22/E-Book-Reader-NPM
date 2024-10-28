import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navigation from './StackNavigator'; // Ensure this is the correct path to your navigator
import { BookProvider } from './context/BookContext'; // Adjust the path as needed
import { ThemeProvider } from './context/ThemeContext'; // Adjust the path as needed
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications'; // Import Expo Notifications
import React, { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token); // Send this token to your server if needed
    };

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
