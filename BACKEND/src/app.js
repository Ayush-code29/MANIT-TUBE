import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

import videoRouter from "./routes/video.routes.js";
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("MANIT Tube API Running");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
export default app;