import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ServiceListScreen from './src/screens/ServiceListScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Services' }} />
        <Stack.Screen name="ServiceList" component={ServiceListScreen} options={{ title: 'Services' }} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: 'Service Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
