import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCartItems, getUrl, removeCartItem, updateCartItem } from '../utils/api';

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const baseURL = getUrl(); // Get the base URL

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const customerId = await AsyncStorage.getItem('CustID');
                if (customerId) {
                    const response = await getCartItems(customerId);

                    // Validate the response
                    if (response && Array.isArray(response)) {
                        const items = response;
                        setCartItems(items);
                        calculateTotalPrice(items);
                    } else {
                        console.warn('Invalid data format received');
                        Alert.alert('Error', 'Failed to load cart items. Data format is incorrect.');
                    }
                } else {
                    Alert.alert('Error', 'Customer ID not found.');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                Alert.alert('Error', 'Failed to load cart items.');
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items) => {
        let total = 0;
        items.forEach((item) => {
            if (item.UnitPrice && item.Quantity) {
                total += parseFloat(item.UnitPrice) * item.Quantity;
            }
        });
        setTotalPrice(total);
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeCartItem(itemId);
            const updatedItems = cartItems.filter(item => item.CartItemID !== itemId);
            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);
            Alert.alert('Item removed', 'The item has been removed from your cart');
        } catch (error) {
            console.error('Error removing item:', error);
            Alert.alert('Error', 'Failed to remove item');
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        try {
            await updateCartItem(itemId, newQuantity);
            const updatedItems = cartItems.map(item =>
                item.CartItemID === itemId ? { ...item, Quantity: newQuantity } : item
            );
            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const handlePlaceOrder = async () => {
        if (totalPrice === 0) {
            Alert.alert('Cart is empty', 'Please add items to the cart');
        } else {
            try {
               // await placeOrder({ totalPrice });
                //Alert.alert('Order Placed', 'Your order has been placed successfully!');
                navigation.navigate('Order');
                
            } catch (error) {
                console.error('Error placing order:', error);
                Alert.alert('Error', 'Failed to place order');
            }
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image
                source={{ uri: `${baseURL}/customer/image/${item.ProductID}` }}
                style={styles.image}
                onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
            />
            <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.ProductName}</Text>
                <Text style={styles.price}>₹{item.UnitPrice}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleUpdateQuantity(item.CartItemID, item.Quantity - 1)}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.Quantity}</Text>
                    <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleUpdateQuantity(item.CartItemID, item.Quantity + 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={styles.removeButton} 
                    onPress={() => handleRemoveItem(item.CartItemID)}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Cart</Text>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.CartItemID.toString()}
                    renderItem={renderItem}
                />
            )}
            <View style={styles.summary}>
                <Text style={styles.total}>Total: ₹{totalPrice.toFixed(2)}</Text>
                <TouchableOpacity 
                    style={styles.checkoutButton} 
                    onPress={handlePlaceOrder}
                >
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    emptyCartText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
        marginTop: 50,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#444',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    quantityButton: {
        backgroundColor: '#eee',
        padding: 5,
        borderRadius: 5,
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    removeButton: {
        marginTop: 10,
        backgroundColor: '#ff4444',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    summary: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        alignItems: 'center',
    },
    total: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    checkoutButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CartScreen;
