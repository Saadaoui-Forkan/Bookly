import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { bookReducer } from './slices/bookSlice';
import { favoritesReducer } from './slices/favoriteSlice';

const store = configureStore({
    reducer: {
       auth: authReducer, 
       book: bookReducer,
       favorites: favoritesReducer,
    }
});

export default store