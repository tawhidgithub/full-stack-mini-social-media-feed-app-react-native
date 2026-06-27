import React, { useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenContainer from "../component/ScreenContainer";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";

import { AuthNavigationProp } from "../navigation/types";
import { authService } from "../services/data.services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../hooks/useAuthContext";

const RegisterScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { login: authLogin, logout: clearSession } = useAuthContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Validation", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await authService.register({
        username,
        email,
        password,
      });

      console.log("Register Response", res);

      await authLogin(res.user, res.token);
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View className="flex-1 justify-center">
        <Text className="mb-2 text-center text-3xl font-bold text-gray-900">
          Create Account
        </Text>

        <Text className="mb-10 text-center text-gray-500">
          Join Mini Social Feed
        </Text>

        <CustomInput
          label="Username"
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />

        <CustomInput
          label="Email"
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <CustomInput
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton
          title={loading ? "Creating..." : "Register"}
          onPress={handleRegister}
          className="mt-2"
        />

        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-500">Already have an account?</Text>

          <TouchableOpacity
            className="ml-2"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="font-semibold text-blue-600">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default RegisterScreen;
