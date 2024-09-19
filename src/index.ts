import { config } from "dotenv";

import { env } from "./config/globals";
import { Player } from "discord-player";
import {
  ActivityType,
  Client,
  GatewayIntentBits,
  type Message,
} from "discord.js";
import { prefixs } from "./constants/prefixs";
import { CommandFactory } from "./factories/CommandFactory";

import "./player/events";
import { YoutubeiExtractor } from "discord-player-youtubei";

config();

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a: string) => {
    return GatewayIntentBits[a as keyof typeof GatewayIntentBits];
  }),
});

// TODO: refactor factory
const commandFactory = new CommandFactory();

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 27,
    dlChunkSize: 0,
  },
});

player.extractors.register(YoutubeiExtractor, {
  streamOptions: {
    useClient: "ANDROID",
  },
});

player.extractors.loadDefault((ext) => ext !== "YouTubeExtractor");

const token =
  process.env.NODE_ENV === "production" ? process.env.TOKEN : env.TOKEN;

client
  .login(token)
  .then((result) => console.log("discord client connect", result));

client.on("ready", () => {
  client.user?.setActivity(">help", {
    type: ActivityType.Listening,
  });
  console.log("bot started");
});

client.on("error", console.error);

client.on("messageCreate", async (message: Message) => {
  try {
    if (message.author.bot) return;

    const prefix: string = message.content
      .split(" ")
      .shift()
      ?.toLowerCase() as string;
    if (prefix.charAt(0) !== ">") return;
    if (!prefixs[prefix?.slice(1)]) await message.reply("Unknown command!");

    const command = commandFactory.generateCommand(prefix.slice(1));

    const query = message.content.slice(prefix.length).trim().split(/ +/g);
    command.execute(message, query.join().replace(",", " "));
  } catch (err) {
    console.log({ err });
  }
});
