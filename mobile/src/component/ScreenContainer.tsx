import React from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  const { width } = useWindowDimensions();
  const MAX_WIDTH = 600;

  const Container = (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center">
        <View
          style={{
            width: "100%",
            maxWidth: MAX_WIDTH,
            flex: 1,
          }}
          className="px-4"
        >
          {children}
        </View>
      </View>
    </SafeAreaView>
  );

  // ❌ Web: don’t wrap with TouchableWithoutFeedback
  if (Platform.OS === "web") {
    return Container;
  }

  // 📱 Mobile: keep keyboard dismiss behavior
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {Container}
    </TouchableWithoutFeedback>
  );
}
