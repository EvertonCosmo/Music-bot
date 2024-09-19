import type { GuildResolvable, Message } from "discord.js";
import type { ICommand } from "interfaces/Icommand";

import { useMainPlayer } from "discord-player";

export class DisconnectCommand implements ICommand {
  execute(message: Message): void {
    async function exe() {
      const player = useMainPlayer();
      const queue = player.getQueue(message.guild as GuildResolvable);
      if (queue) queue.destroy();
      message.react("👋");
    }

    (() => {
      exe();
    })();
  }
}
