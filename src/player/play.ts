import { QueryType, useMainPlayer } from "discord-player";
import {
  GuildVoiceChannelResolvable,
  VoiceChannel,
  type Message,
} from "discord.js";

import { Command } from "../interfaces/commands";


export class PlayCommand extends Command {
  constructor() {
    super("play", "Play a track");
  }

  execute(message: Message, query?: string): Promise<unknown> {
    return this.executePlayCommand(message, query);
  }

  private async executePlayCommand(
    message: Message,
    query?: string,
  ): Promise<unknown> {
    const player = useMainPlayer();

    if (!message.member?.voice.channelId) {
      return message.reply({
        embeds: [
          { description: "You are not in a voice channel!", color: 0xb84e44 },
        ],
      });
    }

    const result = await player.search(query, {
      requestedBy: message.author.username,
      searchEngine: QueryType.AUTO,
    });

    if (!result?.tracks?.length) {
      return message.reply({
        embeds: [{ description: "No results found:", color: 0xb84e44 }],
      });
    }

    player.createPlaylist(result.playlist);

    
    player.play(
      message.member.voice.channel as GuildVoiceChannelResolvable,
      "dsjkdjka",
    );
  }
}
