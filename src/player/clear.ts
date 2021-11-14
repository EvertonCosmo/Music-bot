import { GuildResolvable, Message } from 'discord.js';
import { player } from '..';
import { ICommand } from 'interfaces/Icommand';

export class ClearCommand implements ICommand {
  execute(message: Message<boolean>, query?: string): void {
    async function exe() {
      const queue = player.getQueue(message.guild as GuildResolvable);
      const hasPlaying = queue?.playing;
      if (!queue || !hasPlaying) return message.channel.send(`No music playing ${message.author} ...`);

      if (queue) await queue.clear();

      message.react('✅');
    }

    (() => exe())();
  }
}
