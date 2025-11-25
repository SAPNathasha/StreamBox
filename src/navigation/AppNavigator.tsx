import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MainTabs from "./MainTabs";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList, "RootStack">();

export default function AppNavigator() {
  const token = useSelector((s: RootState) => s.auth.token);

  return (
    <RootStack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      {!token ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <RootStack.Screen name="Main" component={MainTabs} />
      )}
    </RootStack.Navigator>
  );
}
