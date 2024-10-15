import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

const BookingHistoryScreen = ({ navigation }) => {
  const bookings = [
    { id: '1', service: 'House Cleaning', date: '2023-06-15', status: 'Completed' },
    { id: '2', service: 'Plumbing Repair', date: '2023-06-10', status: 'Cancelled' },
    { id: '3', service: 'Lawn Mowing', date: '2023-06-05', status: 'Completed' },
    { id: '4', service: 'Electrical Work', date: '2023-06-01', status: 'Completed' },
  ];

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookingItem}
      onPress={() => navigation.navigate('BookingDetails', { booking: item })}
    >
      <View>
        <Text style={styles.serviceName}>{item.service}</Text>
        <Text style={styles.bookingDate}>{item.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, { color: item.status === 'Completed' ? theme.colors.success : theme.colors.error }]}>
          {item.status}
        </Text>
        <Ionicons name="chevron-forward" size={24} color={theme.colors.subText} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    padding: theme.spacing.m,
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.medium,
  },
  serviceName: {
    ...theme.typography.bodyLarge,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bookingDate: {
    ...theme.typography.bodyMedium,
    color: theme.colors.subText,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    ...theme.typography.bodyMedium,
    fontWeight: 'bold',
    marginRight: theme.spacing.s,
  },
});

export default BookingHistoryScreen;
