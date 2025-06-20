import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from "./firebase";

const Signup = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLoginNavigate = () => {
    router.push('/'); // Redirect to the login/index page
  };

  const onRegister = async () => {
    // Clear any previous toast messages
    toast.dismiss();

    // Validate email
    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      return;
    }

    // Validate other fields
    if (!firstName || !lastName || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
        toast.success("User Registered Successfully");
        console.log("User Registered Successfully");
      }

      // Navigate to Dashboard
      router.push('/(drawer)/dashboard');
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Error: ${error.message}`); // Display error in notification
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Sign Up</Text>

        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <MyButton title="Sign Up" onPress={onRegister} />

        <TouchableOpacity onPress={onLoginNavigate}>
          <Text style={styles.link}>Already registered? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F0FF', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 6, // Android shadow
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: 320,
    gap: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3A7A',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1B3A7A',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 16,
    width: 240,
    backgroundColor: '#F4F6FA',
  },
  link: {
    color: '#1B3A7A',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default Signup;
