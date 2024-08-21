import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Login from './components/Login';
import ProductList from './components/ProductList';
import BillSuccessScreen from './screens/BillSuccessScreen';
import CartScreen from './screens/CartScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import OrderDetail from './screens/OrderDetails';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutUs from './screens/AboutUs';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{header: () => null}} />
      <Stack.Screen name="Home" component={HomeScreen} options={{header: () => true }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{header: () => null}}/>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />

      <Stack.Screen name="AboutUs" component={AboutUs} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyOrders" component={OrderScreen} />
      {/* <Stack.Screen name="UserProfile" component={UserProfileScreen} /> */}
      
      <Stack.Screen
        name="BillSuccess"
        component={BillSuccessScreen}
        options={{ 
          headerLeft: () => false // Remove the back button
        }}
      />
     
      <Stack.Screen name="Dashboard" component={DashboardScreen} />

      
    </Stack.Navigator>
  );
};

export default AppNavigator;
