// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loadJSON, saveJSON } from "../utils/storage";

type StoredUser = {
  email: string;
  password: string;
};

type User = {
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null; // dummy token just to keep shape
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// Local-only "register" (no network, no API key)
export const registerUser = createAsyncThunk<
  { email: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/register", async (payload, thunkAPI) => {
  try {
    const existing =
      ((await loadJSON("users")) as StoredUser[] | null) ?? [];

    if (existing.some((u) => u.email === payload.email)) {
      return thunkAPI.rejectWithValue("Email already registered.");
    }

    const updated: StoredUser[] = [...existing, payload];
    await saveJSON("users", updated);

    return { email: payload.email };
  } catch (err) {
    return thunkAPI.rejectWithValue(
      "Registration failed. Please try again."
    );
  }
});

// Local-only "login" (no network, no API key)
export const loginUser = createAsyncThunk<
  { email: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (payload, thunkAPI) => {
  try {
    const existing =
      ((await loadJSON("users")) as StoredUser[] | null) ?? [];

    const user = existing.find(
      (u) =>
        u.email === payload.email && u.password === payload.password
    );

    if (!user) {
      return thunkAPI.rejectWithValue("Invalid email or password.");
    }

    return { email: user.email };
  } catch (err) {
    return thunkAPI.rejectWithValue("Login failed. Please try again.");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      saveJSON("auth", null);
    },
    setUserFromStorage(
      state,
      action: PayloadAction<{ user: User | null; token: string | null } | null>
    ) {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      } else {
        state.user = null;
        state.token = null;
      }
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { email: action.payload.email };
        state.token = "dummy-token";
        state.error = null;
        saveJSON("auth", { user: state.user, token: state.token });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed.";
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { email: action.payload.email };
        state.token = "dummy-token";
        state.error = null;
        saveJSON("auth", { user: state.user, token: state.token });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed.";
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
