// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

// Save JWT token to storage
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// export const getToken = () => {
//   return localStorage.getItem('token'); // Or however you store the token
// };


// Get JWT token from storage
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Remove JWT token from storage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};




export const  removecartID = async () => {
  await AsyncStorage.removeItem('cartID');
};


export const removeorderID = () => {
  AsyncStorage.removeItem('OrderId');
};

