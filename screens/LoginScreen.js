// screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase'; // Adjust the path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Animatable from 'react-native-animatable';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Google Sign-In setup
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '7511835637A12-46ojtmvu46ge8t1ev8eourtul83be87r.apps.googleusercontent.com', // Replace with your client ID
  });

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
      navigation.navigate('Main'); // Ensure 'Main' is a valid route in your navigation
    } catch (error) {
      console.error('Error signing in with email:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleGoogleSignIn = async (idToken) => {
    // Here you can use the idToken to sign in to your backend or Firebase
    // For Firebase:
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
    <LinearGradient colors={['#334155', '#131624']} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo style={{ textAlign: 'center' }} name="open-book" size={80} color="white" />
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

        {/* Google Sign In Button */}
        <Animatable.View animation="bounceIn" duration={1500}>
          <Pressable style={styles.iconButton} onPress={() => promptAsync()}>
            <View style={styles.circleIcon}>
              <AntDesign name="googleplus" size={20} color="black" />
            </View>
          </Pressable>
        </Animatable.View>

        {/* Already have an account? */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('ResigterScreen')}>
            <Text style={styles.footerLink}>Register here</Text>
          </Pressable>
        </View>
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
  iconButton: {
    padding: 10,
    alignItems: 'center',
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
    marginTop: 20,
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
