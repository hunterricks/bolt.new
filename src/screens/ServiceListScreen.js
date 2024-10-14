import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const services = [
  { id: '1', name: 'House Cleaning', price: '$80-$120' },
  { id: '2', name: 'Plumbing Repair', price: '$100-$200' },
  { id: '3', name: 'Electrical Work', price: '$90-$150' },
  { id: '4', name: 'Painting', price: '$200-$500' },
  { id: '5', name: 'Lawn Mowing', price: '$50-$100' },
  { id: '6', name: 'Carpet Cleaning', price: '$100-$250' },
];

const ServiceListScreen = ({ navigation, route }) => {
  const selectedService = route.params?.service;
  const filteredServices = selectedService
    ? services.filter(service => service.name.toLowerCase().includes(selectedService.toLowerCase()))
    : services;

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
    >
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  servicePrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default ServiceListScreen;
