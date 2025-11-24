import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadJSON, saveJSON } from "../utils/storage";

const REQRES = "https://reqres.in/api"; // dummy auth

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    const res = await axios.post(`${REQRES}/login`, payload);
    return { ...payload, token: res.data.token };
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: { email: string; password: string }, thunkAPI) => {
    const res = await axios.post(`${REQRES}/register`, payload);
    return { ...payload, id: res.data.id, token: res.data.token };
  }
);

const slice = createSlice({
  name: "auth",
  initialState: { user: null as any, token: null as string | null, status: "idle" as string },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      saveJSON("auth", null);
    },
    setUserFromStorage(state, action) {
      state.user = action.payload?.user ?? null;
      state.token = action.payload?.token ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = { email: action.payload.email };
        state.token = action.payload.token;
        state.status = "succeeded";
        saveJSON("auth", { user: state.user, token: state.token });
      })
      .addCase(loginUser.pending, (state) => { state.status = "loading"; })
      .addCase(loginUser.rejected, (state) => { state.status = "failed"; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = { email: action.payload.email };
        state.token = action.payload.token;
        saveJSON("auth", { user: state.user, token: state.token });
      });
  }
});

export const { logout, setUserFromStorage } = slice.actions;
export default slice.reducer;
