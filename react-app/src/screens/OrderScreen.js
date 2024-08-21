import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUrl } from '../utils/api';
import { removecartID } from '../utils/storage';

const OrderScreen = ({ navigation }) => {
    const [ShipAddress, setShipAddress] = useState('');
    const [ShipCity, setShipCity] = useState('');
    const [ShipPostalCode, setShipPostalCode] = useState('');
    const [ShipCountry, setShipCountry] = useState('');

    const baseURL = getUrl(); // Get the base URL

    const handleSubmit = async () => {
        try {
            const CustID = await AsyncStorage.getItem('CustID');
            const token = await AsyncStorage.getItem('token');

            const getAuthHeader = () => ({
                headers: { token: `${token}` },
            });

            const orderData = {
                ShipAddress,
                ShipCity,
                ShipPostalCode,
                ShipCountry,
            };

            // Post the order data
            await axios.post(`${baseURL}/customer/orders/addorder/${CustID}`, orderData, getAuthHeader());

            // Fetch the last order for the customer
            const lastOrderResponse = await axios.get(`${baseURL}/customer/orders/lastorder/${CustID}`, getAuthHeader());
            const lastOrder = lastOrderResponse.data;

            if (lastOrder.length > 0) {
                const OrderID = lastOrder[0].OrderID;
                await AsyncStorage.setItem('OrderId', String(OrderID));

                const cartId = await AsyncStorage.getItem('cartID')

                // Copy order items
                await axios.post(`${baseURL}/customer/orderdetails/copyorderitem/${OrderID}/${CustID}`, {}, getAuthHeader());

                // Fetch cart items and reduce inventory
                const finalCartItems = await axios.get(`${baseURL}/customer/cartitems/all/${CustID}`, getAuthHeader());
                const cartItems = finalCartItems.data;

                for (const item of cartItems) {
                    const productID = item.ProductID;
                    await axios.put(`${baseURL}/customer/reduce/product/${productID}`, null, getAuthHeader());
                }

                await axios.delete(`${baseURL}/customer/cartitems/delete/${cartId}`, getAuthHeader());

                await axios.delete(`${baseURL}/customer/cart/${cartId}`, getAuthHeader());

                removecartID();

                // Send a notification about the order being placed successfully
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Order Placed Successfully!",
                        body: "Your order has been placed successfully.",
                    },
                    trigger: null,
                });

                navigation.navigate('BillSuccess');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert('Error', 'Failed to place order');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Place Your Order</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Shipping Address"
                    value={ShipAddress}
                    onChangeText={setShipAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={ShipCity}
                    onChangeText={setShipCity}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Postal Code"
                    value={ShipPostalCode}
                    onChangeText={setShipPostalCode}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Country"
                    value={ShipCountry}
                    onChangeText={setShipCountry}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#0275d8',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OrderScreen;
