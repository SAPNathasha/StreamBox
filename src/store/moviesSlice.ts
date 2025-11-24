import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoviesByCategory, fetchMultipleCategories } from "../api/moviesApi";

export const fetchMovies = createAsyncThunk("movies/fetch", async (category: string) => {
  const data = await fetchMoviesByCategory(category);
  return data;
});

const slice = createSlice({
  name: "movies",
  initialState: { list: [] as any[], status: "idle" as string },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (s) => { s.status = "loading"; })
      .addCase(fetchMovies.fulfilled, (s, a) => { s.status = "succeeded"; s.list = a.payload; })
      .addCase(fetchMovies.rejected, (s) => { s.status = "failed"; });
  }
});

export default slice.reducer;
