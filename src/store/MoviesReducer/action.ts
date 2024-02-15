import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../services/request';
import { AxiosError } from 'axios';
import { Actor, Crew, Movie, MovieDetails } from './types';

export const getMovies = createAsyncThunk<
  {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  },
  {
    page: number;
    sortBy: string;
  }
>('moviesReducers/getMovies', async ({ page, sortBy }, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi(
      `3/discover/movie?page=${page}&sort_by=${sortBy}`,
    );
    return data;
  } catch (err) {
    const error = err as AxiosError;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getOneMovie = createAsyncThunk<MovieDetails, number>(
  'moviesReducers/getOneMovies',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi(`3/movie/${id}`);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const getActors = createAsyncThunk<
  { id: number; cast: Actor[]; crew: Crew[] },
  number
>('movieReducer/getActors', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi(`3/movie/${id}/credits`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
