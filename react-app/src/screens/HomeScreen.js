import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addCartItem, getProducts, getUrl } from '../utils/api';
import { getToken } from '../utils/storage';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // For carousel pagination
  const navigation = useNavigation();

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
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      } catch (error) {
        console.error('Error fetching products:', error);
        Alert.alert('Error', 'Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const filterProducts = () => {
      if (searchQuery.trim() === '') {
        setFilteredProducts(products);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = products.filter(product =>
          product.ProductName.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [searchQuery, products]);

  const handleAddToCart = async (productId) => {
    try {
      const customerID = await AsyncStorage.getItem('CustID');
      const authHeader = await getAuthHeader();
      const cartResponse = await axios.get(`${baseURL}/customer/cart/${customerID}`, authHeader);

      let cartID;

      if (cartResponse.data.length > 0) {
        cartID = cartResponse.data[0].CartID;
      } else {
        await axios.post(`${baseURL}/customer/cart/`, { CustomerID: customerID }, authHeader);
        const newCartResponse = await axios.get(`${baseURL}/customer/cart/${customerID}`, authHeader);
        cartID = newCartResponse.data[0].CartID;
      }

      await AsyncStorage.setItem('cartID', String(cartID));

      const cartId = await AsyncStorage.getItem('cartID');
      const parsedCartID = cartId ? Number(cartId) : null;

      if (parsedCartID !== null) {
        await addCartItem(parsedCartID, productId);
        setModalMessage('Product added to cart successfully!');
        setShowModal(true);
        // navigation.navigate('Cart');
      } else {
        throw new Error('Failed to retrieve CartID.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setModalMessage('Failed to add product to cart.');
      setShowModal(true);
    }
  };

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20, marginTop: 24 }}>
        {/* Top Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'sticky' }}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 15,
              backgroundColor: '#f0f0f0',
              marginRight: 10,
            }}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={24} color="black" />

            
          </TouchableOpacity>
        </View>

        {/* Banner Section */}
        <View style={{ marginBottom: 20 }}>
          <Image
            source={{ uri: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/layout-engine/2024-06/June-18_Dove_Homepage.jpg' }} // Replace this URL with your actual banner image URL
            style={{ width: '100%', height: 140, borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>

        {/* Featured Products Section */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
          Bestsellers
        </Text>

        {/* Product Carousel */}
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <FlatList
            data={filteredProducts}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.ProductID.toString()}
            renderItem={({ item }) => (
              <View style={{
                width: 180,
                marginRight: 15,
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: '#fff',
                elevation: 4,
                alignItems: 'center',
                padding: 10,
                borderWidth: 1,
                borderColor: '#ddd'
              }}>
                <Image
                  source={{ uri: `${baseURL}/customer/image/${item.ProductID}` }}
                  style={{ width: 120, height: 120, resizeMode: 'cover', borderRadius: 10 }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/180';
                    console.error('Error loading image:', e);
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>{item.ProductName}</Text>
                <Text style={{ fontSize: 16, color: '#555', marginBottom: 10 }}>₹{item.UnitPrice}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4caf50',
                    paddingVertical: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    width: '100%',
                  }}
                  onPress={() => handleAddToCart(item.ProductID)}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            )}
            onViewableItemsChanged={handleViewableItemsChanged}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {filteredProducts.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: currentIndex === index ? '#4caf50' : '#ccc',
                  margin: 3,
                }}
              />
            ))}
          </View>
        </View>



        {/* Products List Section */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
          All Products
        </Text>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.ProductID.toString()}
          renderItem={({ item }) => (
            <View style={{
              width: '100%',
              marginBottom: 15,
              borderRadius: 15,
              overflow: 'hidden',
              backgroundColor: '#fff',
              elevation: 4,
              alignItems: 'center',
              padding: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              flexDirection: 'row'
            }}>
              <Image
                source={{ uri: `${baseURL}/customer/image/${item.ProductID}` }}
                style={{ width: 80, height: 80, resizeMode: 'cover', borderRadius: 10 }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                  console.error('Error loading image:', e);
                }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{item.ProductName}</Text>
                <Text style={{ fontSize: 14, color: '#555', marginBottom: 10 }}>₹{item.UnitPrice}</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4caf50',
                  paddingVertical: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}
                onPress={() => handleAddToCart(item.ProductID)}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Modal for showing messages */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginBottom: 20 }}>{modalMessage}</Text>
              <Button title="Close" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
