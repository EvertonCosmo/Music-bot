import { GuildResolvable, Message } from 'discord.js';
import { player, lyrics } from '..';
import { ICommand } from 'interfaces/Icommand';

export class LyricsCommand implements ICommand {
  execute(message: Message<boolean>, query?: string): void {
    async function exe() {
      const queue = player.getQueue(message.guild as GuildResolvable);
      const query = `${queue.current.title} ${queue.current.author}`;
      if (!query)
        return message.channel.send({
          embeds: [
            {
              description: `No music playing.\n`,
              color: 0xb84e44,
            },
          ],
        });
      const resultLyrics = await lyrics.search(query);
      console.log({ resultLyrics });

      if (!resultLyrics) {
        message.channel.send({
          embeds: [
            {
              description: `No lyrics found for ${query}.\n`,
              color: 0xb84e44,
            },
          ],
        });
      } else {
        let trimLyrics =
          resultLyrics.lyrics.length > 4095 ? resultLyrics.lyrics.substring(0, 4029) + '...' : resultLyrics.lyrics;

        message.channel.send({
          embeds: [
            {
              title: `${resultLyrics.title} - ${resultLyrics.artist.name}`,
              url: resultLyrics.url,
              thumbnail: {
                url: resultLyrics.thumbnail,
              },
              description: trimLyrics,
              color: 0x44b868,
            },
          ],
        });
      }
    }

    (() => {
      exe();
    })();
  }
}
