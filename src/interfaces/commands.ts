import { Client, Message } from 'discord.js';

export abstract class Command {
  name!: string;
  voiceChannel?: boolean;
  description?: string;

  constructor(name: string, isVoiceChannel?: boolean, description?: string) {
    this.name = name;
    this.voiceChannel = isVoiceChannel;
    this.description = description;
  }

  // abstract execute(query: string, message: Message): void;
}
