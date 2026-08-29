import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";

import connectDB from "./src/db/index.js";

const PORT =
  process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Database connection failed:",
      error
    );

    process.exit(1);
  });