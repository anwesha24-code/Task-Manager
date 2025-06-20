import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const router = useRouter();

  const onLogin = () => {
    router.push('/signup'); // Navigate to the login page
  };

  const onSignup = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome to Task Manager</Text>
        <MyButton title="Login" onPress={onLogin} />
        <Text style={styles.text}>Do not have an account?</Text>
        <MyButton title="Signup" onPress={onSignup} />
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
    
    minWidth: 320,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3A7A',
    marginBottom: 24,
    textAlign: 'center',
  },
  text: {
    marginVertical: 16,
    fontSize: 16,
    color: '#22315A',
    textAlign: 'center',
  },
});

export default Index;
