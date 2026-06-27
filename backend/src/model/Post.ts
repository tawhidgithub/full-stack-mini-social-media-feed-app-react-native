import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: 500,
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export default Post;
