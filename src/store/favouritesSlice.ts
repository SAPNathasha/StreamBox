import { createSlice } from "@reduxjs/toolkit";
import { saveJSON, loadJSON } from "../utils/storage";

const initial = {
  items: [] as any[]
};

const slice = createSlice({
  name: "favourites",
  initialState: initial,
  reducers: {
    setFavourites(state, action) {
      state.items = action.payload;
    },
    addFavourite(state, action) {
      state.items.push(action.payload);
      saveJSON("favourites", state.items);
    },
    removeFavourite(state, action) {
      state.items = state.items.filter((m) => m.id !== action.payload.id);
      saveJSON("favourites", state.items);
    }
  }
});

export const { addFavourite, removeFavourite, setFavourites } = slice.actions;

export const restoreFavourites = () => async (dispatch: any) => {
  const data = await loadJSON("favourites");
  if (data) dispatch(setFavourites(data));
};

export default slice.reducer;
