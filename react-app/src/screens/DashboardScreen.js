// src/screens/DashboardScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to your Dashboard!</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="View Orders" onPress={() => navigation.navigate('Orders')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default DashboardScreen;
