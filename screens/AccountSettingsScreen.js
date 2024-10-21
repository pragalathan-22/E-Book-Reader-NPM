// AccountSettingsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AccountSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert("Notifications", `Notifications have been ${notificationsEnabled ? "disabled" : "enabled"}.`);
  };

  const confirmEmail = () => {
    // Logic for email confirmation can go here
    setEmailConfirmed(true);
    Alert.alert("Email Confirmation", "A confirmation email has been sent to your registered email address.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      {/* Toggle Notifications */}
      <TouchableOpacity style={styles.option} onPress={toggleNotifications}>
        <Text style={styles.optionText}>Notifications: {notificationsEnabled ? "On" : "Off"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Privacy Settings</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#131624',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  option: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
