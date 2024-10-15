import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProviderProfileScreen = ({ route }) => {
  const { provider } = route.params;

  const reviews = [
    { id: '1', user: 'Alice', rating: 5, comment: 'Excellent service! Very professional and thorough.' },
    { id: '2', user: 'Bob', rating: 4, comment: 'Good job, but arrived a bit late.' },
    { id: '3', user: 'Charlie', rating: 5, comment: 'Fantastic work! Will definitely hire again.' },
  ];

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{item.user}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: provider.image }} style={styles.providerImage} />
          <Text style={styles.providerName}>{provider.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{provider.rating} ({provider.reviews} reviews)</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            Professional home service provider with over 10 years of experience. Specializing in cleaning, repairs, and maintenance.
          </Text>
          
          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesList}>
            <Text style={styles.serviceItem}>• House Cleaning</Text>
            <Text style={styles.serviceItem}>• Plumbing Repairs</Text>
            <Text style={styles.serviceItem}>• Electrical Work</Text>
            <Text style={styles.serviceItem}>• Painting</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Reviews</Text>
          <FlatList
            data={reviews}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  providerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  providerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  servicesList: {
    marginTop: 8,
  },
  serviceItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProviderProfileScreen;
