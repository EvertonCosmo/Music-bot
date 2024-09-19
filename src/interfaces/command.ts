import type { Message } from "discord.js";
import type { ICommand } from "./Icommand";

export abstract class Command implements ICommand {
  private name: string;
  private voiceChannel: boolean;
  private description: string;

  constructor(name: string, isVoiceChannel: boolean, description: string) {
    this.name = name;
    this.voiceChannel = isVoiceChannel;
    this.description = description;
  }
  abstract execute(message: Message, query?: string): Promise<unknown>;
}
