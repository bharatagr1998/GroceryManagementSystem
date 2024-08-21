// src/components/Navbar.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const Navbar = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="Grocery App" />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    backgroundColor: '#6200ee',
  },
});

export default Navbar;
