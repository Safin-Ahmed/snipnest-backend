import mongoose from "mongoose";
import {
  User,
  Profile,
  RefreshToken,
  Snippet,
  SnippetFile,
  Comment,
  StarReact,
} from "../model";

let connectionURL = process.env.DB_CONNECTION_URL || "";

connectionURL = connectionURL?.replace(
  "<username>",
  process.env.DB_USER_NAME || ""
);

connectionURL = connectionURL?.replace(
  "<password>",
  process.env.DB_PASSWORD || ""
);

export const connectDB = async () => {
  const dbName =
    process.env.NODE_ENV === "test"
      ? "snipnest-test"
      : process.env.DB_NAME || "snipnest";

  await mongoose.connect(connectionURL, {
    dbName,
  });

  console.log("Database Connected");
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("Database disconnected");
};

export const clearAllData = async () => {
  const models: any = [
    User,
    Profile,
    RefreshToken,
    Snippet,
    SnippetFile,
    Comment,
    StarReact,
  ];

  try {
    for (const model of models) {
      await model.deleteMany({});
    }
  } catch (err) {
    console.error("Error clearing data: ", err);
  }
};
