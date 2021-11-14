import { GuildResolvable, Message } from 'discord.js';
import { player, client } from '..';
import { ICommand } from 'interfaces/Icommand';

export class DisconnectCommand implements ICommand {
  execute(message: Message): void {
    async function exe() {
      const queue = player.getQueue(message.guild as GuildResolvable);
      if (queue) queue.destroy();
      message.react('👋');
    }

    (() => {
      exe();
    })();
  }
}
