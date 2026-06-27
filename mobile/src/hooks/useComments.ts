import { useEffect, useState } from "react";
import { postService } from "../services/data.services/post.service";

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getComments = async () => {
    try {
      setLoading(true);

      const res = await postService.getComments(postId);
      console.log("res---------", res);

      setComments(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (text: string) => {
    console.log("res----body-----", text);
    const res = await postService.addComment(postId, text);
    console.log("res----addComment-----", res);

    setComments((prev) => [res.data, ...prev]);

    return res;
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  return {
    comments,
    loading,
    getComments,
    addComment,
  };
};
