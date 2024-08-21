import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const AboutUs = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <Image
                source={{ uri: 'https://example.com/your-logo.png' }} // Replace with your logo URL
                style={styles.logo}
            /> */}
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.description}>
                Welcome to Grocery Store! We are your one-stop solution for all your grocery needs. Our mission is to provide fresh and quality products at your doorstep, ensuring a hassle-free shopping experience.
            </Text>
            <Text style={styles.description}>
                We understand the importance of health and well-being, and that's why we bring you the best selection of fruits, vegetables, dairy, and more. Our team is dedicated to sourcing products that meet the highest standards of quality and freshness.
            </Text>
            <Text style={styles.description}>
                With our user-friendly app, you can easily browse through a wide variety of products, place your order, and have it delivered to your home in no time. We are committed to offering competitive prices and excellent customer service.
            </Text>
            <Text style={styles.description}>
                Thank you for choosing Grocery Store. We look forward to serving you!
            </Text>
            <Text style={styles.footer}>
                Contact Us: support@grocerystore.com | +1-800-123-4567
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 24,
    },
    footer: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginTop: 30,
    },
});

export default AboutUs;