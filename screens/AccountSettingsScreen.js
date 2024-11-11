// AccountSettingsScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import { auth } from '../services/firebase'; // Import the Firebase auth

const AccountSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Phone number input
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationType, setVerificationType] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false); // State to show/hide phone input

  useEffect(() => {
    const fetchUserEmail = () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);
        setEmailConfirmed(user.emailVerified); // Check if email is verified
      } else {
        Alert.alert("Error", "No user is currently logged in.");
      }
    };

    fetchUserEmail();
  }, []);

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
    Alert.alert("Notifications", `Notifications have been ${!notificationsEnabled ? "enabled" : "disabled"}.`);
  };

  const confirmEmail = async () => {
    if (emailConfirmed) {
      Alert.alert("Email Confirmation", "Your email is already confirmed.");
      return;
    }

    setLoading(true);
    try {
      await auth.currentUser.sendEmailVerification(); // Use Firebase to send a verification email
      Alert.alert("Email Confirmation", "A confirmation email has been sent to your registered email address.");
    } catch (error) {
      Alert.alert("Error", "Failed to send confirmation email.");
    } finally {
      setLoading(false);
    }
  };

  const verifyPhone = () => {
    setShowPhoneInput(true); // Show phone input when clicking the phone option
  };

  const submitVerification = () => {
    // Validate verification code logic should be here; this is a placeholder
    if (verificationCode === '123456') { // Replace with actual verification logic
      if (verificationType === 'email') {
        setEmailConfirmed(true);
        Alert.alert("Email Verified", "Your email has been verified successfully.");
      } else if (verificationType === 'phone') {
        setPhoneConfirmed(true);
        Alert.alert("Phone Verified", "Your phone has been verified successfully.");
      }
      setShowVerificationInput(false);
      setVerificationCode('');
    } else {
      Alert.alert("Verification Failed", "Invalid verification code.");
    }
  };

  const updatePhoneNumber = async () => {
    const phoneNumberPattern = /^\+\d{10,15}$/; // Basic validation for international phone format
    if (!phoneNumberPattern.test(phone)) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
      return;
    }

    setLoading(true); // Show loading indicator
    try {
      // Update phone number logic can be added here (e.g., using Firebase)
      // Placeholder for API call
      const response = await fetch('https://api.example.com/user/update-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error("Failed to update phone number."); // Handle failed response
      }

      Alert.alert("Success", "Your phone number has been updated.");
      setPhone(''); // Optionally reset the phone input
      setShowPhoneInput(false); // Hide phone input after update
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update phone number.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <LinearGradient colors={["#212f3d", "#212f3d"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Settings</Text>

        {/* Toggle Notifications */}
        {/* <TouchableOpacity style={styles.option} onPress={toggleNotifications}>
          <Text style={styles.optionText}>Notifications: {notificationsEnabled ? "On" : "Off"}</Text>
        </TouchableOpacity> */}

        {/* Email Verification */}
        <TouchableOpacity style={styles.option} onPress={confirmEmail}>
          <Text style={styles.optionText}>Email: {emailConfirmed ? "(Verified)" : email}</Text>
        </TouchableOpacity>

        {/* Phone Verification */}
        {/* <TouchableOpacity style={styles.option} onPress={verifyPhone}>
          <Text style={styles.optionText}>Phone: {phoneConfirmed ? "(Verified)" : phone}</Text>
        </TouchableOpacity> */}

        {/* Phone Number Input */}
        {/* {showPhoneInput && (
          <View style={styles.verificationContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={[styles.verifyButton, loading && { opacity: 0.5 }]} // Decrease opacity when loading
              onPress={updatePhoneNumber}
              disabled={loading} // Disable button if loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" /> // Show loading indicator
              ) : (
                <Text style={styles.verifyButtonText}>Update Phone Number</Text>
              )}
            </TouchableOpacity>
          </View>
        )} */}

        {/* Verification Input */}
        {/* {showVerificationInput && (
          <View style={styles.verificationContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.verifyButton} onPress={submitVerification}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        )} */}

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
  verificationContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  verifyButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
