import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  varient?: "error" | "primary";
  className?: string;
  textClassName?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  className = "",
  textClassName = "",
  varient = "primary",
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      className={`
        h-14
        items-center
        justify-center
        rounded-xl
        bg-blue-600
        ${isDisabled ? "opacity-50" : ""}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          className={`${
            varient === "primary"
              ? "text-base font-semibold text-white"
              : "text-red-400"
          }
          `}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
