import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

// Type the arguments directly instead of using React.FC
const CustomInput = ({
  label,
  error,
  containerClassName = "",
  ...props
}: CustomInputProps) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text>
      )}

      <TextInput
        placeholderTextColor="#9CA3AF"
        className={`
          min-h-[52px]
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          text-base
          text-gray-900
          ${props.multiline ? "py-3" : ""}
        `}
        {...props}
      />

      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
};

export default CustomInput;
