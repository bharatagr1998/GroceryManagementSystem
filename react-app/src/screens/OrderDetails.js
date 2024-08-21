import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { getUrl } from '../utils/api';
import { getToken } from '../utils/storage';

const OrderDetail = () => {
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const baseURL = getUrl();

    const getAuthHeader = async () => {
        const token = await getToken();
        return {
            headers: {
                token: `${token}`,
            },
        };
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const CustID = await AsyncStorage.getItem('CustID');

            // const getAuthHeader = async () => {
            //     const token =await AsyncStorage.getItem('token');
            //     return {
            //         headers: {
            //             token: `${token}`,
            //         },
            //     };
            // };

            //const getAuthHeader = async () => {
            //     const token = await getToken();
            //     return {
            //         headers: {
            //             token: `${token}`,
            //         },
            //     };
            // };

            try {
                const response = await axios.get(`${baseURL}/customer/orderdetails/all/${CustID}`,await getAuthHeader());
                const groupedOrders = response.data.reduce((acc, order) => {
                    if (!acc[order.OrderID]) {
                        acc[order.OrderID] = [];
                    }
                    acc[order.OrderID].push(order);
                    return acc;
                }, {});
                setOrders(groupedOrders);
            } catch (error) {
                setError('Failed to fetch orders');
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
            {Object.keys(orders).map((orderId) => (
                <Card key={orderId} style={styles.card}>
                    <Card.Title title={`Order ID: ${orderId}`} titleStyle={styles.cardTitle} />
                    <Card.Content>
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Product Name</Text>
                                <Text style={styles.tableHeaderText}>Quantity</Text>
                            </View>
                            {orders[orderId].map((order) => (
                                <View key={order.ProductName} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{order.ProductName}</Text>
                                    <Text style={styles.tableCell}>{order.Quantity}</Text>
                                </View>
                            ))}
                        </View>
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
    },
    cardTitle: {
        backgroundColor: '#17a2b8',
        color: '#fff',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    table: {
        marginTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#333',
        backgroundColor: '#eaeaea',
    },
    tableHeaderText: {
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default OrderDetail;
