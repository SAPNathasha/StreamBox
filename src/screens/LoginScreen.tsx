import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { RootState, AppDispatch } from "../store";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");

  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((s: RootState) => s.auth.status);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password }));
    } catch (e) {
      alert("Login failed. Use example email/password from reqres.in");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StreamBox — Login</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        {authStatus === "loading" ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.btnText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, marginBottom: 12, borderRadius: 8, padding: 8 },
  title: { fontSize: 22, marginBottom: 12, textAlign: "center" },
  link: { color: "blue", marginTop: 12, textAlign: "center" },
  btn: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "600" },
});
