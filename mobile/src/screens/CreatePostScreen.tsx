import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import ScreenContainer from "../component/ScreenContainer";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import { usePosts } from "../hooks/usePost";
import { AppNavigationProp } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";

const MAX_CHARACTERS = 500;

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const { createPost } = usePosts();
  const navigation = useNavigation<AppNavigationProp>();

  const handleCreatePost = async () => {
    const trimmed = content.trim();

    if (!trimmed) {
      Alert.alert("Validation", "Please write something.");
      return;
    }

    try {
      await createPost(trimmed);

      Alert.alert("Success", "Post created successfully.");

      setContent("");

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to create post",
      );
    }
  };

  return (
    <ScreenContainer>
      <View className="flex-1">
        <Text className="mb-2 text-3xl font-bold text-gray-900">
          Create Post
        </Text>

        <Text className="mb-6 text-gray-500">
          Share your thoughts with everyone.
        </Text>

        <CustomInput
          label="What's on your mind?"
          placeholder="Write something..."
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
        />

        <Text className="mb-4 text-right text-sm text-gray-500">
          {content.length}/{MAX_CHARACTERS}
        </Text>

        <CustomButton
          title="Publish Post"
          onPress={handleCreatePost}
          disabled={!content.trim()}
        />
      </View>
    </ScreenContainer>
  );
};

export default CreatePostScreen;
