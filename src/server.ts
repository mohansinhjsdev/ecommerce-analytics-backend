import app from "./app";
import { ENV } from "./config/env.config";
import { connectDB } from "./config/db";
import "./config/redis";

console.log("AWS_ACCESS_KEY_ID:", ENV.AWS_ACCESS_KEY_ID);
console.log("AWS_REGION:", ENV.AWS_REGION);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};
startServer();
