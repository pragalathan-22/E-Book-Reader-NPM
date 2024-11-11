// screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert, TextInput, ImageBackground } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importing FontAwesome for phone icon
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase'; // Adjust the path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Animatable from 'react-native-animatable';
import { GoogleAuthProvider } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Google Sign-In setup
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'AIzaSyAr_EtvpTL8zbgwv1Rc1plNJscRTqtzB5Q', // Replace with your actual client ID
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Main'); // Navigate to the main screen if the user is authenticated
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [navigation]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleSignIn(id_token);
    }
  }, [response]);

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Email and Password are required for this sign-in method.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      navigation.navigate('Main'); // Navigate to Main screen
    } catch (error) {
      console.error('Error signing in with email:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleGoogleSignIn = async (idToken) => {
    const credential = GoogleAuthProvider.credential(idToken);
    try {
      const userCredential = await auth.signInWithCredential(credential);
      console.log('User signed in with Google:', userCredential.user);
      navigation.navigate('Main'); // Navigate to Main screen
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      Alert.alert('Google Sign-In Failed', error.message);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/1.jpg')} // Replace with your image path if it's a local asset
      style={styles.background} 
      resizeMode="cover"
    >
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo style={{ textAlign: 'center' }} name="open-book" size={75} color="white" />
        <Text style={styles.title}>Books are a uniquely portable magic.</Text>
        <View style={{ height: 80 }} />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
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

        {/* Google Sign In and Phone Sign In Buttons */}
        {/* <Animatable.View animation="bounceIn" duration={1500}>
          <View style={styles.iconContainer}>
            <Pressable style={styles.iconButton} onPress={() => promptAsync()}>
              <View style={styles.circleIcon}>
                <AntDesign name="googleplus" size={20} color="black" />
              </View>
            </Pressable>
            
            <Pressable style={styles.iconButton} onPress={() => Alert.alert("Phone Sign In clicked")}>
              <View style={styles.circleIcon}>
                <FontAwesome name="phone" size={20} color="black" />
              </View>
            </Pressable>
          </View>
        </Animatable.View> */}

        {/* Already have an account? */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.footerLink}>Register here</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    backgroundColor: '#fff',
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
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: 300, // Set the width to match the button above
    alignSelf: 'center', // Center the container
  },
  iconButton: {
    padding: 10,
    alignItems: 'center',
    flex: 1, // Allow buttons to grow equally
    justifyContent: 'center',
  },
  circleIcon: {
    backgroundColor: '#e2e8f0',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  footerText: {
    color: '#ccc',
  },
  footerLink: {
    color: '#94a3b8',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
