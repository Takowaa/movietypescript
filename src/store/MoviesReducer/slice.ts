import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getActors, getMovies, getOneMovie } from './action';
import { InitialState } from './types';

const initialState: InitialState = {
  movies: {
    total: 0,
    rows: [],
  },
  movieDetails: {
    loading: 'idle',
    data: null,
    error: null,
  },
  actors: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies.total = action.payload.total_results;
        state.movies.rows = action.payload.results;
      })
      .addCase(getOneMovie.pending, state => {
        state.movieDetails.loading = 'pending';
      })
      .addCase(getOneMovie.fulfilled, (state, action) => {
        state.movieDetails.loading = 'succeeded';
        state.movieDetails.data = action.payload;
      })
      .addCase(getOneMovie.rejected, (state, action: PayloadAction<any>) => {
        state.movieDetails.loading = 'failed';
        state.movieDetails.error = action.payload
          ? action.payload.status_message
          : 'Unknown error';
      })
      .addCase(getActors.fulfilled, (state, action) => {
        state.actors = action.payload.cast;
      });
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
