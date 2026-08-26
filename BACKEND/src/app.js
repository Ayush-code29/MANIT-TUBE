import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import saveRoutes from "./routes/save.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  "/api/v1/users",
  userRoutes
);

app.use(
  "/api/v1/videos",
  videoRoutes
);

app.use(
  "/api/v1/comments",
  commentRoutes
);

app.use(
  "/api/v1/likes",
  likeRoutes
);

app.use(
  "/api/v1/saves",
  saveRoutes
);

export default app;