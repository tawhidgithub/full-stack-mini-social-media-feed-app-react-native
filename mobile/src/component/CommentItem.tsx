import React from "react";
import { Text, View } from "react-native";

interface CommentItemProps {
  username: string;
  comment: string;
  createdAt?: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  username,
  comment,
  createdAt,
}) => {
  return (
    <View className="mb-3 rounded-xl border border-gray-200 bg-white p-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-semibold text-gray-900">@{username}</Text>

        {createdAt && (
          <Text className="text-xs text-gray-500">{createdAt}</Text>
        )}
      </View>

      <Text className="text-base leading-6 text-gray-700">{comment}</Text>
    </View>
  );
};

export default CommentItem;
