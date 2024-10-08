// screens/loginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as Animatable from 'react-native-animatable';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Function to handle Email Sign-In
  const handleEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Email and Password are required for this sign-in method.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
      navigation.navigate('Main'); // Ensure 'Main' is a valid route in your navigation
    } catch (error) {
      console.error('Error signing in with email:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  // Function to handle Sign In with E-Book Reader
  const handleEBookReaderSignIn = () => {
    // Implement your logic for signing in with E-Book Reader
    // This can be a direct navigation to Main if no credentials are required
    console.log('Signed in with E-Book Reader');
    navigation.navigate('Main'); // Navigate to Main or handle any logic required
  };

  return (
    <LinearGradient colors={['#334155', '#131624']} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo style={{ textAlign: 'center' }} name="open-book" size={80} color="white" />
        <Text style={styles.title}>
          Books are a uniquely portable magic.
        </Text>
        <View style={{ height: 80 }} />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Enhanced Sign In Button */}
        <Animatable.View animation="bounceIn" duration={1500}>
          <Pressable style={styles.signInButton} onPress={handleEmailSignIn}>
            <Text style={styles.buttonText}>Sign In With Mail</Text>
          </Pressable>
        </Animatable.View>

        {/* Google Sign In Option */}
        <Pressable style={styles.otherLoginOption}>
          <AntDesign name="googleplus" size={24} color="black" />
          <Text style={styles.optionText}>Continue With Google</Text>
        </Pressable>

        {/* Sign In With E-Book Reader Button */}
        <Pressable
          style={styles.signInButton}
          onPress={handleEBookReaderSignIn} // Update to use the E-Book Reader sign-in handler
        >
          <Text style={styles.buttonText}>Sign In With E-Book Reader</Text>
        </Pressable>
        
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    backgroundColor: '#e2e8f0',
    padding: 10,
    marginVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    borderRadius: 25,
  },
  signInButton: {
    backgroundColor: '#94a3b8',
    padding: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  otherLoginOption: {
    backgroundColor: '#e2e8f0',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  optionText: {
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
});

export default LoginScreen;
