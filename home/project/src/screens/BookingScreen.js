import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { bookService } from '../store/slices/bookingsSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const BookingScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleBooking = () => {
    const bookingData = {
      service: service.name,
      date: date.toISOString(),
      time,
      address,
      notes
    };

    dispatch(bookService(bookingData))
      .unwrap()
      .then(() => {
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          }),
        ]).start(() => {
          navigation.navigate('BookingConfirmation', { service, date, time });
        });
      })
      .catch((error) => {
        console.error('Booking failed:', error);
        // Show error message to user
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.title}>Book {service.name}</Text>
        
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="Enter preferred time"
        />
        
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter service address"
          multiline
        />
        
        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any special instructions or requirements?"
          multiline
        />
        
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBooking}
          activeOpacity={0.7}
        >
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
          <Ionicons name="arrow-forward" size={24} color={theme.colors.card} />
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.m,
  },
  title: {
    ...theme.typography.headerLarge,
    color: theme.colors.text,
    marginBottom: theme.spacing.l,
  },
  label: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.l,
  },
  bookButtonText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.card,
    fontWeight: 'bold',
    marginRight: theme.spacing.s,
  },
});

export default BookingScreen;
