import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    // This would be an API call in a real app
    const response = await new Promise(resolve => 
      setTimeout(() => resolve({
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890'
      }), 1000)
    );
    return response;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData) => {
    // This would be an API call in a real app
    const response = await new Promise(resolve => 
      setTimeout(() => resolve(userData), 1000)
    );
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
