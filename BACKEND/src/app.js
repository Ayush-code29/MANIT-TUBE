import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import saveRouter from "./routes/save.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

app.use(
  "/api/v1/users",
  userRouter
);

app.use(
  "/api/v1/videos",
  videoRouter
);

app.use(
  "/api/v1/comments",
  commentRouter
);

app.use(
  "/api/v1/likes",
  likeRouter
);

app.use(
  "/api/v1/saves",
  saveRouter
);

app.use(
  "/api/v1/subscriptions",
  subscriptionRouter
);

export default app;