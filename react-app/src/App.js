// // src/App.js
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';

// import Footer from './components/Footer';
// import Login from './components/Login';
// import Navbar from './components/Navbar';
// import BillSuccessScreen from './screens/BillSuccessScreen';
// import DashboardScreen from './screens/DashboardScreen';
// import RegisterScreen from './screens/RegisterScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const App = () => {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Navbar />
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="Dashboard" component={DashboardScreen} />
//           <Stack.Screen name="BillSuccess" component={BillSuccessScreen} />
//         </Stack.Navigator>
//         <Footer />
//       </NavigationContainer>
//     </PaperProvider>
//   );
// };

// export default App;
