import type { GuildResolvable, Message } from "discord.js";

import { useMainPlayer } from "discord-player";
import type { ICommand } from "../interfaces/Icommand";
import { Command } from "../interfaces/command";

export class ClearCommand extends Command{
    execute(message: Message, query?: string): Promise<unknown> {
       
    }

  async private execute() {

  }
}
