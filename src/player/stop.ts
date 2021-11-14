import { GuildResolvable, Message } from 'discord.js';
import { client, player } from '../';
import { ICommand } from 'interfaces/Icommand';

export class StopCommand implements ICommand {
  execute(message: Message): void {
    async function exe() {
      const queue = player.getQueue(message.guild as GuildResolvable);
      const hasPlaying = queue?.playing;
      if (!queue || !hasPlaying) return message.channel.send(`No music playing ${message.author} ...`);
      queue.clear();
      queue.destroy();
    }
    (() => {
      exe();
    })();
  }
}
