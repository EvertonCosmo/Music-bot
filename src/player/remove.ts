import { GuildResolvable, Message } from 'discord.js';
import { player } from '..';
import { ICommand } from 'interfaces/Icommand';

export class RemoveCommand implements ICommand {
  execute(message: Message<boolean>, query?: string): void {
    async function exe() {
      const queue = player.getQueue(message.guild as GuildResolvable);
      const hasPlaying = queue?.playing;

      if (!queue || !hasPlaying) return message.channel.send(`No music playing ${message.author}`);

      if (Number(query) > queue.tracks.length)
        return message.reply({ embeds: [{ description: 'Please insert a valid position', color: 0xb84e44 }] });
      const trackToRemove = Number(query) - 1;
      if (!queue.tracks[trackToRemove])
        return message.reply({ embeds: [{ description: 'No results found:', color: 0xb84e44 }] });

      const { title, url } = queue.tracks[trackToRemove];
      queue.remove(trackToRemove);

      message.channel.send({
        embeds: [
          {
            description: `Removed [${title}](${url})`,
            color: 0x44b868,
          },
        ],
      });
    }
    (() => {
      exe();
    })();
  }
}
