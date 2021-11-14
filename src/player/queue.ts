import { GuildResolvable, Message, MessageEmbed } from 'discord.js';
import { client, player } from '../';
import { ICommand } from 'interfaces/Icommand';

export class QueueCommand implements ICommand {
  execute(message: Message, query?: string): void {
    async function exe() {
      const queue = player.getQueue(message.guild as GuildResolvable);
      const serverName = message.guild?.name;
      const hasPlaying = queue?.playing;
      if (!queue || !hasPlaying) {
        const embed = new MessageEmbed();
        embed.setTitle(`Queue of ${serverName}`);
        embed.setColor('#b84e44');
        embed.setDescription('no songs in the queue :< ');
        return message.channel.send({ embeds: [embed] });
      }
      if (!queue.tracks[0])
        return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

      const embed = new MessageEmbed();

      embed.setColor('GREEN');
      embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: false }));
      embed.setAuthor(` ${serverName} queue `);
      const tracks = queue.tracks.map((track, index) => {
        return `**${index + 1}** - ${track.title} ([link](${track.url}) )`;
      });

      const tracksLength = queue.tracks.length;

      const nextSongs =
        tracksLength > 20
          ? `And **${tracksLength - 20}** other track(s)...`
          : `In the playlist: **${tracksLength}** track(s)...`;

      embed.setDescription(
        `**Now playing ${queue.current.title}**\n\n${tracks.slice(0, 20).join('\n')}\n\n${nextSongs}`
      );
      embed.setTimestamp();
      message.channel.send({ embeds: [embed] });
    }

    (() => {
      exe();
    })();
  }
}
