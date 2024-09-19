import { config } from "dotenv";

const envFound = config();

if (!envFound) {
  throw new Error("!  Couldn't find .env file  !");
}

export const env = {
  TOKEN: process.env.TOKEN,
  GENIUS_TOKEN: process.env.GENIUS_TOKEN,
  YOUTUBE_COOKIE: process.env.YOUTUBE_COOKIE,
};
