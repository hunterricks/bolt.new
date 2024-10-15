import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    const response = await api.fetchBookings();
    return response;
  }
);

export const bookService = createAsyncThunk(
  'bookings/bookService',
  async (bookingData) => {
    const response = await api.bookService(bookingData);
    return response;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(bookService.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default bookingsSlice.reducer;
