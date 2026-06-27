import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />

      <Text className="mt-3 text-base text-gray-500">{text}</Text>
    </View>
  );
};

export default LoadingSpinner;
