import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    // In a real app, this would be an API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve([
        { id: '1', name: 'House Cleaning', price: '$80-$120', rating: 4.8 },
        { id: '2', name: 'Plumbing Repair', price: '$100-$200', rating: 4.6 },
        { id: '3', name: 'Electrical Work', price: '$90-$150', rating: 4.7 },
      ]), 1000)
    );
    return response;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
