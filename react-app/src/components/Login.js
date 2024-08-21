import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import { getUrl, login } from '../utils/api';
import { saveToken } from '../utils/storage';

const Login = ({ navigation }) => {
  const [Email, setEmail] = useState('admin@gmail.com');
  const [Password, setPassword] = useState('Admin');

  const handleLogin = async () => {
    try {
      const response = await login({ Email, Password });
      saveToken(response.jwttoken);

      const getAuthHeader = () => {
        const token = response.jwttoken;
        return {
          headers: {
            token: `${token}`,
          },
        };
      };

      const baseURL = getUrl();
      const customerID = response.custID;
      await AsyncStorage.setItem('CustID', customerID.toString());

      const cartResponse = await axios.get(`${baseURL}/customer/cart/${customerID}`, getAuthHeader());

      let cartID;

      if (cartResponse.data.length > 0) {
        cartID = cartResponse.data[0].CartID;
      } else {
        const createCartResponse = await axios.post(`${baseURL}/customer/cart/`, { CustomerID: customerID }, getAuthHeader());
        const newCartResponse = await axios.get(`${baseURL}/customer/cart/${customerID}`, getAuthHeader());
        cartID = newCartResponse.data[0].CartID;
      }

      await AsyncStorage.setItem('cartID', String(cartID));
      navigation.navigate('Home');
      Alert.alert('Login Successful', 'Welcome back!');
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', 'Invalid Email or Password');
    }
  };

  const handlePasswordRecovery = () => {
    // Navigate to the password recovery screen or show a modal
    navigation.navigate('PasswordRecovery');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://w0.peakpx.com/wallpaper/239/976/HD-wallpaper-grocery-store.jpg' }} // Background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Grocery Store</Text>
        <Text style={styles.subtitle}>Welcome</Text>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          mode="outlined"
          label="Email"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          theme={{ colors: { primary: '#4caf50', text: '#fff', placeholder: '#d3d3d3' } }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: '#4caf50', text: '#fff', placeholder: '#d3d3d3' } }}
        />

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>

        <TouchableRipple
          onPress={() => navigation.navigate('Register')}
          rippleColor="rgba(255, 255, 255, 0.3)"
        >
          <Text style={styles.registerText}>Don't have an account? Register here</Text>
        </TouchableRipple>

       
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '85%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#4caf50',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
  recoveryText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Login;
