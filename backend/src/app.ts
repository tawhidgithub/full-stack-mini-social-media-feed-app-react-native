import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import interactionRoutes from "./routes/interaction.routes";
import notificationRoutes from "./routes/notification.route";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Health Check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini Social Feed API Running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", interactionRoutes);
app.use("/api", notificationRoutes);
export default app;
