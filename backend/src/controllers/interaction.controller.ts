import { Request, Response } from "express";
import { Types } from "mongoose";

import { sendNotification } from "../services/notification.service";
import User from "../model/User";
import Post from "../model/Post";
import CommentModel from "../model/Comment";

export const toggleLike = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log("toggleLike run ------------");

    const postId = req.params.id as string;
    const userId = req.user?.userId;
    const username = req.user?.username;
    const currentUser = await User.findById(userId).select("username");

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const post = await Post.findById(postId).populate(
      "author",
      "username expoPushToken",
    );

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString(),
    );

    // Unlike
    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );

      await post.save();

      res.status(200).json({
        success: true,
        message: "Post unliked",
        likesCount: post.likes.length,
      });

      return;
    }

    // Like
    post.likes.push(new Types.ObjectId(userId));
    await post.save();

    const postOwner = post.author as any;
    console.log("Post owner:", postOwner);
    console.log("Current user:", userId);
    console.log("Push token:", postOwner.expoPushToken);
    // Don't notify yourself
    if (
      postOwner.expoPushToken &&
      postOwner._id.toString() !== userId.toString()
    ) {
      console.log("sendNotification-------------run ");

      await sendNotification(
        postOwner.expoPushToken,
        "👍 New Like",
        `${currentUser?.username} liked your post`,
        {
          type: "like",
          postId: post._id.toString(),
          senderId: userId,
        },
      );
    }

    res.status(200).json({
      success: true,
      message: "Post liked",
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("Toggle Like Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update like",
    });
  }
};

export const addComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { text } = req.body;
    const postId = req.params.id as string;
    const userId = req.user?.userId;
    const username = req.user?.username;
    const currentUser = await User.findById(userId).select("username");

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Find post and populate author
    const post = await Post.findById(postId).populate(
      "author",
      "username expoPushToken",
    );

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    // Create comment
    const comment = await CommentModel.create({
      post: new Types.ObjectId(postId),
      author: new Types.ObjectId(userId),
      text,
    });

    // Update comment count
    post.commentsCount += 1;
    await post.save();

    // Populate comment author for frontend response
    const populatedComment = await CommentModel.findById(comment._id).populate(
      "author",
      "username email",
    );

    // Send notification (don't notify yourself)
    const postOwner = post.author as any;
    console.log("Post owner:", postOwner);
    console.log("Current user:", userId);
    console.log("Push token:", postOwner.expoPushToken);

    if (postOwner.expoPushToken && postOwner._id.toString() !== userId) {
      console.log("run here---------");

      await sendNotification(
        postOwner.expoPushToken,
        "💬 New Comment",
        `${currentUser?.username} commented on your post`,
        {
          type: "comment",
          postId: post._id.toString(),
          commentId: comment._id.toString(),
          senderId: userId,
        },
      );
    }

    res.status(201).json({
      success: true,
      message: "Comment added",
      data: populatedComment,
    });
  } catch (error) {
    console.error("Add Comment Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

export const getComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const postId = req.params.id as string; // ✅ assert string

    const comments = await CommentModel.find({
      post: new Types.ObjectId(postId), // ✅ now valid
    })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch comments" });
  }
};
