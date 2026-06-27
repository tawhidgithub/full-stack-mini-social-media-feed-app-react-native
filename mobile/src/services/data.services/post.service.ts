import api from "../../api/api";
import { ENDPOINTS } from "../../api/endpoints";

export const postService = {
  getPosts: async (page?: number, username?: string) => {
    const res = await api.get(ENDPOINTS.posts, {
      params: {
        page,
        username: username || undefined,
      },
    });

    return res.data;
  },

  createPost: async (content: string) => {
    const res = await api.post(ENDPOINTS.posts, {
      content,
    });

    return res.data;
  },

  likePost: async (postId: string) => {
    const res = await api.post(ENDPOINTS.likePost(postId));
    console.log("----like response ", res.data);

    return res.data;
  },
  getComments: async (postId: string) => {
    const res = await api.get(ENDPOINTS.comments(postId));

    return res.data;
  },
  addComment: async (postId: string, text: string) => {
    console.log("----comment body ", { postId: postId, text: text });

    const res = await api.post(ENDPOINTS.comment(postId), {
      text,
    });

    return res.data;
  },
};
