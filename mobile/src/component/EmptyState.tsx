import React from "react";
import { Text, View } from "react-native";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  description = "Content will appear here when available.",
}) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="mb-2 text-lg font-semibold text-gray-800">{title}</Text>

      <Text className="text-center text-gray-500">{description}</Text>
    </View>
  );
};

export default EmptyState;
