import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    // validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert('All fields are required!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address!');
      return;
    }
    router.navigate('/(drawer)/dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Sign Up</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <MyButton title="Register" onPress={onRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 6,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: 320,
    gap: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3A7A',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1B3A7A',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 16,
    width: 240,
    backgroundColor: '#F4F6FA',
  },
});

export default Signup;
