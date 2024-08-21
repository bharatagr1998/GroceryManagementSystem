// // src/screens/BillSuccessScreen.js
// import React from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';

// const BillSuccessScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.successText}>Payment Successful!</Text>
//       <Text style={styles.messageText}>Your order has been placed successfully.</Text>
//       <Button
//         title="Go to Home"
//         onPress={() => navigation.navigate('Home')} // Assuming 'Home' is the name of your home screen
//         color="#0275d8"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   successText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
// });

// export default BillSuccessScreen;



import { Ionicons } from '@expo/vector-icons'; // Make sure to install `@expo/vector-icons`
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BillSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={100} color="#4BB543" style={styles.icon} />
      <Text style={styles.successText}>Payment Successful!</Text>
      <Text style={styles.messageText}>Your order has been placed successfully.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background for a clean look
  },
  icon: {
    marginBottom: 30, // Space between icon and success text
  },
  successText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker text for contrast
    textAlign: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#0275d8',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BillSuccessScreen;
