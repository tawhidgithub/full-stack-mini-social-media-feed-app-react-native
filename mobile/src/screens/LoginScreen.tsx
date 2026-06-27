import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../component/ScreenContainer";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {
  AppNavigationProp,
  AuthNavigationProp,
  AuthStackParamList,
} from "../navigation/types";
import { useAuth } from "../hooks/useAuth";
import { registerForPushNotifications } from "../services/data.services/notification.service";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authNavigation = useNavigation<AuthNavigationProp>();

  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      const response = await login({
        email,
        password,
      });

      console.log(response);

      Alert.alert("Success", "Login successful");
      const token = await registerForPushNotifications();

      console.log(token);
    } catch (error: any) {
      console.log("error-------", error);

      Alert.alert(
        "Login Failed",
        error?.response?.data?.message || "Something went wrong",
      );
    }
  };
  return (
    <ScreenContainer>
      <View className="flex-1 justify-center">
        <Text className="mb-2 text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </Text>

        <Text className="mb-10 text-center text-gray-500">
          Sign in to continue
        </Text>

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          className="mt-2"
        />
        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-500">Don't have an account?</Text>

          <TouchableOpacity
            className="ml-2"
            onPress={() => {
              authNavigation.navigate("Register");
            }}
          >
            <Text className="font-semibold text-blue-600">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;
