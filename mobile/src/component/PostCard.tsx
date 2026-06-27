import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Comment } from "../screens/FeedScreen";
import { useComments } from "../hooks/useComments";
import { getRelativeTime } from "../utils/time";

// Utility: initials + color from username
const COLORS = [
  { bg: "#dbeafe", text: "#1e40af" },
  { bg: "#dcfce7", text: "#166534" },
  { bg: "#ede9fe", text: "#5b21b6" },
  { bg: "#fef3c7", text: "#92400e" },
  { bg: "#fee2e2", text: "#991b1b" },
];
const getColor = (name?: string) => {
  const safeName = name || "?";
  return COLORS[safeName.charCodeAt(0) % COLORS.length];
};
const getInitials = (name?: string) => {
  if (!name) return "?";

  return name
    .split(/[\s_]/)
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
};

const Avatar = ({
  name = "User",
  size = 32,
}: {
  name?: string;
  size?: number;
}) => {
  const { bg, text } = getColor(name);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: size * 0.36, fontWeight: "600", color: text }}>
        {getInitials(name)}
      </Text>
    </View>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => (
  <View className="mb-2 flex-row items-start gap-2">
    <Avatar name={comment.authorName} size={28} />
    <View className="flex-1">
      <View className="rounded-2xl rounded-tl bg-gray-100 px-3 py-2">
        <Text className="text-xs font-semibold text-gray-900">
          {comment.authorName}
        </Text>
        <Text className="mt-0.5 text-sm text-gray-700 leading-snug">
          {comment.text}
        </Text>
      </View>
      <Text className="ml-1 mt-1 text-xs text-gray-400">
        {comment.createdAt}
      </Text>
    </View>
  </View>
);

type PostCardProps = {
  username: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  comments: Comment[];
  isCommentOpen: boolean;
  postId: string;
  postedTime: string;

  onLike: () => void;
  onComment: () => void;
  onAddComment: (text: string) => void;
};

const PostCard = ({
  username,
  content,
  likesCount,
  commentsCount,
  isLiked,
  postedTime,
  comments,
  isCommentOpen,
  onLike,
  onComment,
  onAddComment,
  postId,
}: PostCardProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<TextInput>(null);
  const {
    comments: allComments,
    loading: commentLoading,
    getComments,
    addComment,
  } = useComments(postId);

  useEffect(() => {
    if (isCommentOpen) {
      getComments();
    }
  }, [isCommentOpen]);
  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addComment(trimmed);
    setInput("");
    Keyboard.dismiss();
  };

  // Auto-focus input when drawer opens
  React.useEffect(() => {
    if (isCommentOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isCommentOpen]);

  return (
    <View className="mb-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
      {/* Post header */}
      <View className="p-4">
        <View className="mb-2 flex-row items-center gap-2">
          <Avatar name={username} size={36} />
          <View>
            <Text className="text-sm font-semibold text-gray-900">
              {username}
            </Text>
            <Text className="text-xs text-gray-400">
              {getRelativeTime(postedTime)}
            </Text>
          </View>
        </View>
        <Text className="text-sm text-gray-800 leading-relaxed">{content}</Text>

        {/* Stats */}
        <View className="mt-2 flex-row gap-4">
          <Text className="text-xs text-gray-400">
            <Text className="font-semibold text-gray-600">{likesCount}</Text>{" "}
            likes
          </Text>
          <Text className="text-xs text-gray-400">
            <Text className="font-semibold text-gray-600">{commentsCount}</Text>{" "}
            comments
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="mx-4 border-t border-gray-100" />

      {/* Action buttons */}
      <View className="flex-row px-2 py-1">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-lg py-2"
          activeOpacity={0.7}
          onPress={onLike}
        >
          <Text
            className={`text-base ${isLiked ? "text-blue-600" : "text-gray-500"}`}
          >
            👍
          </Text>
          <Text
            className={`text-sm font-semibold ${isLiked ? "text-blue-600" : "text-gray-500"}`}
          >
            Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1.5 rounded-lg py-2"
          activeOpacity={0.7}
          onPress={onComment}
        >
          <Text
            className={`text-base ${isCommentOpen ? "text-blue-600" : "text-gray-500"}`}
          >
            💬
          </Text>
          <Text
            className={`text-sm font-semibold ${isCommentOpen ? "text-blue-600" : "text-gray-500"}`}
          >
            Comment
          </Text>
        </TouchableOpacity>
      </View>

      {/* Comment drawer — expands inline */}
      {isCommentOpen && (
        <View className="border-t border-gray-100 bg-gray-50">
          {/* Comment list */}
          {allComments.length > 0 ? (
            <FlatList
              data={allComments}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <CommentItem
                  comment={{
                    _id: item._id,
                    authorName: item.author.username,
                    text: item.text,
                    createdAt: item.createdAt,
                  }}
                />
              )}
              scrollEnabled={false}
              contentContainerStyle={{ padding: 12, paddingBottom: 4 }}
            />
          ) : (
            <Text className="px-4 py-3 text-center text-xs text-gray-400">
              No comments yet. Be the first!
            </Text>
          )}

          {/* Input bar */}
          <View className="flex-row items-center gap-2 border-t border-gray-100 bg-white px-3 py-2">
            <Avatar name="tawhid" size={28} />
            <TextInput
              ref={inputRef}
              className="flex-1 rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-900"
              placeholder="Write a comment…"
              placeholderTextColor="#9ca3af"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSubmit}
              returnKeyType="send"
              blurOnSubmit={false}
              multiline
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!input.trim()}
              className={`h-8 w-8 items-center justify-center rounded-full ${
                input.trim() ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <Text className="text-xs text-white">↑</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostCard;
