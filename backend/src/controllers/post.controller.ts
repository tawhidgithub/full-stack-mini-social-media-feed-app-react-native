import { Request, Response } from "express";
import Post from "../model/Post";
import User from "../model/User";

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const post = await Post.create({
      author: user._id,
      content,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "username email",
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: populatedPost,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const { username } = req.query;
    const userId = req.user?.userId; // ← add this

    let authorFilter: Record<string, any> = {};

    if (username) {
      const author = await User.findOne({
        username: username as string,
      }).select("_id");
      if (!author) {
        res.status(200).json({
          success: true,
          data: [],
          pagination: { page, limit, totalPosts: 0, totalPages: 0 },
        });
        return;
      }
      authorFilter = { author: author._id };
    }

    const posts = await Post.find(authorFilter)
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments(authorFilter);

    // ← map to inject isLiked per user
    const data = posts.map((post) => ({
      ...post.toObject(),
      likesCount: post.likes.length,
      isLiked: post.likes.some((id) => id.toString() === userId?.toString()),
    }));
    console.log({
      data,
      pagination: {
        page,
        limit,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });

    res.status(200).json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email",
    );

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
  }
};
