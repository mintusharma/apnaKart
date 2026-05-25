import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const startServer = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 5000,
      host: "0.0.0.0",
    });

    console.log("Server Running");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();