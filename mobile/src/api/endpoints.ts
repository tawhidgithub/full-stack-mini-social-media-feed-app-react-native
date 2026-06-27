export const ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",

  posts: "/posts",
  notifications: "/notifications/token",

  likePost: (id: string) => `/posts/${id}/like`,

  comments: (id: string) => `/posts/${id}/comments`,
  comment: (id: string) => `/posts/${id}/comment`,
};
