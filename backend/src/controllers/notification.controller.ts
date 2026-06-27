import { Request, Response } from "express";
import User from "../model/User";

export const savePushToken = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const userId = req.user.userId;
    const { token } = req.body;

    await User.findByIdAndUpdate(userId, {
      expoPushToken: token,
    });

    res.json({
      success: true,
      message: "Push token saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
