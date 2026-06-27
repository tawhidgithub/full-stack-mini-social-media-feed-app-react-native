// src/navigation/types.ts
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Feed: undefined;
  CreatePost: undefined;
};

// Create a reusable helper type for your Auth screen navigation props
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;
