import { Message } from 'discord.js';

export interface ICommand {
  execute(message: Message, query?: string): void;
}
