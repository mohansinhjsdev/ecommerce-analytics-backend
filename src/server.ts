import app from "./app";
import { ENV } from "./config/env.config";
import { connectDB } from "./config/db";

async function serverStart() {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
}

serverStart();
