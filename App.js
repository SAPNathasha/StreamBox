// App.tsx
import "react-native-gesture-handler";
import "react-native-reanimated";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { restoreFavourites } from "./src/store/favouritesSlice";

const AppInner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // We ONLY restore favourites.
    // We DO NOT restore auth.user, so the app always starts as logged out.
    dispatch(restoreFavourites());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
