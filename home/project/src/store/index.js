import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import bookingsReducer from './slices/bookingsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    bookings: bookingsReducer,
    user: userReducer,
  },
});
