import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { RouteProp } from "@react-navigation/native";

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

type TabIconProps = {
  size: number;
  color: string;
};

const Tab = createBottomTabNavigator<MainTabParamList, "MainTabs">();

export default function MainTabs() {
  return (
    <Tab.Navigator
      id="MainTabs" 
      screenOptions={({ route }: { route: RouteProp<MainTabParamList, keyof MainTabParamList> }) => ({
        headerShown: false,
        tabBarIcon: ({ size, color }: TabIconProps) => {
          const iconName: keyof typeof Ionicons.glyphMap =
            route.name === "Home" ? "home" : "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
