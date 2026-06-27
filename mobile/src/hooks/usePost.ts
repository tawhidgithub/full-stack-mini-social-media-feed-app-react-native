import { useCallback, useState } from "react";
import { postService } from "../services/data.services/post.service";

export const usePosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = useCallback(async (username = "") => {
    try {
      setLoading(true);
      setError(null);

      const res = await postService.getPosts(1, username);

      setPosts(res.data);

      // 🔥 RESET pagination properly
      setPage(1);
      setHasMore(res.pagination.page < res.pagination.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMorePosts = async (username = "") => {
    console.log("loadingMore---------- res", loadingMore);
    console.log("hasMore---------- res", hasMore);
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const res = await postService.getPosts(nextPage, username);

      if (!res.data.length) {
        setHasMore(false);
        return;
      }

      setPosts((prev) => [...prev, ...res.data]);

      setPage(nextPage);

      // 🔥 safer condition
      setHasMore(nextPage < res.pagination.totalPages);
    } finally {
      setLoadingMore(false);
    }
  };

  const refreshPosts = async (username = "") => {
    try {
      setRefreshing(true);

      const res = await postService.getPosts(1, username);

      setPosts(res.data);

      // 🔥 RESET everything
      setPage(1);
      setHasMore(res.pagination.page < res.pagination.totalPages);
    } finally {
      setRefreshing(false);
    }
  };

  const createPost = async (content: string) => {
    const res = await postService.createPost(content);

    setPosts((prev) => [res.data, ...prev]);
    return res;
  };

  const toggleLike = async (postId: string) => {
    const res = await postService.likePost(postId);

    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              likesCount: res.likesCount,
              isLiked: res.message === "Post liked",
            }
          : post,
      ),
    );
  };

  return {
    posts,
    loading,
    refreshing,
    loadingMore,
    error,
    hasMore,
    getPosts,
    loadMorePosts,
    refreshPosts,
    createPost,
    toggleLike,
  };
};
