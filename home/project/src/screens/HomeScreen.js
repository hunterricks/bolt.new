import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const popularServices = [
  { id: '1', name: 'Cleaning', icon: 'cleaning-services' },
  { id: '2', name: 'Plumbing', icon: 'plumbing' },
  { id: '3', name: 'Electrical', icon: 'electrical-services' },
  { id: '4', name: 'Painting', icon: 'format-paint' },
];

const HomeScreen = ({ navigation }) => {
  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => navigation.navigate('ServiceList', { service: item.name })}
    >
      <Icon name={item.icon} size={40} color="#4a4a4a" />
      <Text style={styles.serviceText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What service do you need?</Text>
      <FlatList
        data={popularServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <TouchableOpacity
        style={styles.allServicesButton}
        onPress={() => navigation.navigate('ServiceList')}
      >
        <Text style={styles.allServicesText}>View All Services</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  serviceItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4a4a4a',
  },
  allServicesButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  allServicesText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
