import { GuildResolvable, Message } from 'discord.js';
import { player } from '..';
import { ICommand } from 'interfaces/Icommand';

export class PauseCommand implements ICommand {
  execute(message: Message, query?: string): void {
    async function exe() {
      const queue = player.getQueue(message.guild as GuildResolvable);
      const hasPlaying = queue?.playing;
      if (!queue || !hasPlaying) return message.channel.send(`No music playing ${message.author} ...`);
      const success = queue.setPaused(true);
      return success ? message.react('⏸️') : message.react('❌');
    }

    (() => {
      exe();
    })();
  }
}
