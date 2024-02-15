import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './MoviesReducer/slice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
