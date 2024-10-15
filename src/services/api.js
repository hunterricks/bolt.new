const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  fetchServices: async () => {
    await delay(1000);
    return [
      { id: '1', name: 'House Cleaning', price: '$80-$120', rating: 4.8 },
      { id: '2', name: 'Plumbing Repair', price: '$100-$200', rating: 4.6 },
      { id: '3', name: 'Electrical Work', price: '$90-$150', rating: 4.7 },
    ];
  },

  fetchBookings: async () => {
    await delay(1000);
    return [
      { id: '1', service: 'House Cleaning', date: '2023-06-15', status: 'Upcoming' },
      { id: '2', service: 'Plumbing Repair', date: '2023-06-10', status: 'Completed' },
      { id: '3', service: 'Lawn Mowing', date: '2023-06-05', status: 'Completed' },
    ];
  },

  fetchUserProfile: async () => {
    await delay(1000);
    return {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    };
  },

  updateUserProfile: async (userData) => {
    await delay(1000);
    return userData;
  },

  bookService: async (bookingData) => {
    await delay(1000);
    return {
      id: Date.now().toString(),
      ...bookingData,
      status: 'Upcoming'
    };
  },

  submitReview: async (reviewData) => {
    await delay(1000);
    return {
      id: Date.now().toString(),
      ...reviewData,
      date: new Date().toISOString()
    };
  }
};

export default api;
