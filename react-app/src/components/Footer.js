// src/components/Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text>Company Info</Text>
      <Text>Quick Links</Text>
      <Text>Contact Info</Text>
      <Text>© 2024 Grocery App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
});

export default Footer;
