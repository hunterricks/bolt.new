import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

const UserProfileScreen = ({ navigation }) => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <InfoItem icon="call" text={user.phone} />
        <InfoItem icon="location" text={user.address} />
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.settingsContainer}>
        <SettingsItem icon="notifications" text="Notifications" />
        <SettingsItem icon="card" text="Payment Methods" />
        <SettingsItem icon="help-circle" text="Help & Support" />
        <SettingsItem icon="log-out" text="Log Out" />
      </View>
    </ScrollView>
  );
};

const InfoItem = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={24} color={theme.colors.primary} style={styles.infoIcon} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const SettingsItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.settingsItem}>
    <Ionicons name={icon} size={24} color={theme.colors.text} style={styles.settingsIcon} />
    <Text style={styles.settingsText}>{text}</Text>
    <Ionicons name="chevron-forward" size={24} color={theme.colors.subText} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.card,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.m,
  },
  name: {
    ...theme.typography.headerMedium,
    color: theme.colors.text,
  },
  email: {
    ...theme.typography.bodyMedium,
    color: theme.colors.subText,
    marginTop: theme.spacing.xs,
  },
  infoContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    marginTop: theme.spacing.m,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  infoIcon: {
    marginRight: theme.spacing.m,
  },
  infoText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    margin: theme.spacing.m,
    alignItems: 'center',
  },
  editButtonText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.card,
    fontWeight: 'bold',
  },
  settingsContainer: {
    backgroundColor: theme.colors.card,
    marginTop: theme.spacing.m,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingsIcon: {
    marginRight: theme.spacing.m,
  },
  settingsText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text,
    flex: 1,
  },
});

export default UserProfileScreen;
