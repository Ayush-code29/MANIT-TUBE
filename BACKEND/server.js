import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/db/index.js";


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`);
    });
});