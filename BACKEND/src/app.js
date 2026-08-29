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

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
|
| Production frontend URL Render environment variable se aayega.
|
| Example:
| FRONTEND_URL=https://your-frontend-url.onrender.com
|
| Local development ke liye localhost bhi allowed hai.
|
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      /*
       * Allow requests without an Origin header.
       * Useful for Postman/server-side requests.
       */
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(
          `CORS blocked for origin: ${origin}`
        )
      );
    },

    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| Cookie Parser
|--------------------------------------------------------------------------
*/

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