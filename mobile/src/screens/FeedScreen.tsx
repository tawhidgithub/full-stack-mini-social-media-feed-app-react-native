import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../component/CustomInput";
import PostCard from "../component/PostCard";
import EmptyState from "../component/EmptyState";
import ScreenContainer from "../component/ScreenContainer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../navigation/types";
import { usePosts } from "../hooks/usePost";
import CustomButton from "../component/CustomButton";
import { useAuth } from "../hooks/useAuth";
import { useComments } from "../hooks/useComments";

export type Comment = {
  _id: string;
  authorName: string;
  text: string;
  createdAt: string;
};

type Post = {
  _id: string;
  username: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  comments: Comment[];
};

const FeedScreen = () => {
  const [search, setSearch] = useState("");
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null,
  );

  const {
    posts,
    getPosts,
    loading,
    refreshing,
    refreshPosts,
    toggleLike,
    loadMorePosts,
    loadingMore,
  } = usePosts();

  useFocusEffect(
    useCallback(() => {
      getPosts();
    }, [getPosts]),
  );

  const navigation = useNavigation<AppNavigationProp>();

  const handleToggleComment = (postId: string) => {
    setOpenCommentPostId((prev) => (prev === postId ? null : postId));
  };

  const handleLike = async (postId: string) => {
    await toggleLike(postId);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getPosts(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <ScreenContainer>
      <View className="mb-4">
        <View className="flex flex-row w-full justify-between my-2">
          <Text className="mb-4 text-3xl font-bold text-gray-900">Feed</Text>
        </View>
        <CustomInput
          placeholder="Search by username..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          className="mt-2 rounded-xl bg-blue-600 p-4"
          activeOpacity={0.8}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Text className="text-center font-semibold text-white">
            Create New Post
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          console.log("Reached end");
          loadMorePosts(search);
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={refreshing}
        onRefresh={refreshPosts}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
          ) : null
        }
        renderItem={({ item }) => (
          <PostCard
            postedTime={item.createdAt}
            postId={item._id}
            username={item.author.username}
            content={item.content}
            likesCount={item.likes.length}
            commentsCount={item.commentsCount}
            isLiked={item.isLiked}
            comments={item.comments ?? []}
            isCommentOpen={openCommentPostId === item._id}
            onLike={() => handleLike(item._id)}
            onComment={() => handleToggleComment(item._id)}
            onAddComment={(text) => {}}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Posts Found"
            description="Create your first post."
          />
        }
      />
    </ScreenContainer>
  );
};

export default FeedScreen;
