import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from "./firebase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigate to Signup Page
  const onSignupNavigate = () => {
    router.push('/signup'); // Redirect to the signup page
  };

  // Handle Login
  const onLogin = async () => {
    try {
      // Validate inputs
      if (!email || !password) {
        toast.error("Please fill in both email and password fields.");
        return;
      }

      // Attempt login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged in Successfully:", userCredential.user);

      // Show success toast
      toast.success("User Logged in Successfully!");

      // Navigate to Dashboard
      router.push('/(drawer)/dashboard');
    } catch (error) {
      console.error("Login Error:", error);

      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        toast.error("Email not registered. Please create an account.");
        onSignupNavigate();
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect email-password combination.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <View style={styles.card}>
        <Text style={styles.heading}>Login</Text>

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
        <MyButton title="Submit" onPress={onLogin} />

        <TouchableOpacity onPress={onSignupNavigate}>
          <Text style={styles.link}>New user? Register Here</Text>
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
    elevation: 6, // Shadow for Android
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

export default Login;
