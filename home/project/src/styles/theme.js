import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#FF9500',
    background: '#F8F8F8',
    card: '#FFFFFF',
    text: '#333333',
    subText: '#666666',
    border: '#E0E0E0',
    success: '#4CD964',
    error: '#FF3B30',
  },
  typography: {
    headerLarge: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    headerMedium: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerSmall: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    bodyLarge: {
      fontSize: 18,
    },
    bodyMedium: {
      fontSize: 16,
    },
    bodySmall: {
      fontSize: 14,
    },
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
  deviceSize: {
    width,
    height,
  },
};

export default theme;
