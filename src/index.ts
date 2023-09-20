import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { connectDB } from "./db";

const server = http.createServer(app);
const port = process.env.PORT || 4000;

const main = async () => {
  try {
    await connectDB();
    server.listen(port, async () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

main();
