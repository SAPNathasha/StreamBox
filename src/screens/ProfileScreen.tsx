import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { RootState, AppDispatch } from "../store";

export default function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {user?.email ?? "User"}</Text>

      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 20 },
  btn: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "600" },
});
