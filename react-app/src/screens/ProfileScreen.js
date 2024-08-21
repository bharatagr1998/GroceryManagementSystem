import { Ionicons } from '@expo/vector-icons'; // Make sure to install `@expo/vector-icons`
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
    navigation.navigate('Login');
  };

  const menuItems = [
    { id: '1', title: 'My Orders', icon: 'cart-outline', onPress: () => navigation.navigate('OrderDetail') },
    { id: '2', title: 'About Us', icon: 'information-circle-outline', onPress: () => navigation.navigate('AboutUs') },
    // { id: '2', title: 'Profile Settings', icon: 'person-outline', onPress: () => navigation.navigate('UserProfile') },
    { id: '3', title: 'Logout', icon: 'log-out-outline', onPress: handleLogout, color: '#ff4d4d' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
            <Ionicons name={item.icon} size={24} color={item.color || '#1e90ff'} />
            <Text style={[styles.menuItemText, item.color && { color: item.color }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
  separator: {
    height: 10,
  },
});

export default ProfileScreen;
