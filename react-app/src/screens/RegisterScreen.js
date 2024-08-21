import React, { useState } from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import { register } from '../utils/api';

const RegisterScreen = ({ navigation }) => {
    const [CustomerName, setCustomerName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ContactName, setContactName] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [PostalCode, setPostalCode] = useState('');
    const [Country, setCountry] = useState('');
    const [Phone, setPhone] = useState('');

    const handleRegister = async () => {
        try {
            const newUser = {
                CustomerName,
                Email,
                Password,
                ContactName,
                Address,
                City,
                PostalCode,
                Country,
                Phone
            };
            await register(newUser);
            Alert.alert('Registration Successful', 'You can now log in');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Registration Failed', 'Failed to register');
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://w0.peakpx.com/wallpaper/239/976/HD-wallpaper-grocery-store.jpg' }} // Background image
            style={styles.background}
            blurRadius={3} // Added blur for better focus on form
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.header}>Register</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Customer Name"
                        value={CustomerName}
                        onChangeText={setCustomerName}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={Email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={Password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contact Name"
                        value={ContactName}
                        onChangeText={setContactName}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={Address}
                        onChangeText={setAddress}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={City}
                        onChangeText={setCity}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Postal Code"
                        value={PostalCode}
                        onChangeText={setPostalCode}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Country"
                        value={Country}
                        onChangeText={setCountry}
                        placeholderTextColor="#666"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={Phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        placeholderTextColor="#666"
                    />
                    <Button mode="contained" onPress={handleRegister} style={styles.button} labelStyle={styles.buttonLabel}>
                        Register
                    </Button>
                    <TouchableRipple
                        onPress={() => navigation.navigate('Login')}
                        rippleColor="rgba(0, 0, 0, 0.1)"
                    >
                        <Text style={styles.loginText}>Already have an account? Login here</Text>
                    </TouchableRipple>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        marginTop: 18,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Increased opacity for better readability
        elevation: 10, // Added shadow for Android
        shadowColor: '#000', // Added shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#333',
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#4caf50',
    },
    buttonLabel: {
        fontSize: 18,
        color: '#fff',
    },
    loginText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#0275d8',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default RegisterScreen;
