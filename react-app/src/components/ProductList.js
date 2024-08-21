// src/components/ProductList.js
import React from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.ProductID.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image
              source={{ uri: `http://192.168.1.107:9999/customer/image/${item.ProductID}` }}
              style={styles.image}
            />
            <Text>{item.ProductName}</Text>
            <Text>₹{item.UnitPrice}</Text>
            <Button title="Add to Cart" onPress={() => onAddToCart(item.ProductID)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productItem: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ProductList;
