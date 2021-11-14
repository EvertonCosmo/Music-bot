import { QueryType } from 'discord-player';
import { GuildResolvable, GuildVoiceChannelResolvable, Interaction, Message } from 'discord.js';
import { client, player } from '../';
import * as playdl from 'play-dl';
import { ICommand } from 'interfaces/Icommand';
import { env } from '@config/globals';
playdl.setToken({
  youtube: {
    cookie: process.env.NODE_ENV === 'production' ? process.env.YOUTUBE_COOKIE : env.YOUTUBE_COOKIE,
  },
});
export class PlayCommand implements ICommand {
  execute(message: Message, query?: string): void {
    async function exe() {
      if (!message.member?.voice.channelId)
        return message.reply({ embeds: [{ description: 'You are not in a voice channel!', color: 0xb84e44 }] });

      const result = await player.search(query, {
        requestedBy: message.author.username,
        searchEngine: QueryType.AUTO,
      });
      if (!result?.tracks?.length) {
        return message.reply({ embeds: [{ description: 'No results found:', color: 0xb84e44 }] });
      }

      // const queue = await player.createQueue(message.guild as GuildResolvable, {
      //   metadata: message.channel,
      //   ytdlOptions: {
      //     quality: 'highest',
      //     filter: 'audioonly',
      //     highWaterMark: 1 << 27,
      //     dlChunkSize: 0,
      //   },
      // });

      const queue = await player.createQueue(message.guild as GuildResolvable, {
        metadata: {
          channel: message.channel,
        },
        ytdlOptions: {
          quality: 'highest',
          filter: 'audioonly',
          highWaterMark: 1 << 25,
          dlChunkSize: 0,
        },
        bufferingTimeout: 1000,
        async onBeforeCreateStream(track, source, _queue) {
          try {
            if (isYoutube(track.url)) {
              return (await playdl.stream(track.url, { quality: 0 })).stream;
            } else {
              // temporary since onBeforeCreateStream crashes the bot if we return void
              return (
                await playdl.stream(
                  await playdl
                    .search(`${track.title} ${track.author}`, { limit: 1, source: { youtube: 'video' } })
                    .then((response) => {
                      return response[0].url;
                    }),

                  { quality: 0 }
                )
              ).stream;
            }
          } catch (err) {
            console.error(`[${message?.guild?.name}] Error: onBeforeCreateStream() -> ${err?.message}`);
            // await
          }
        },
      });

      try {
        if (!queue.connection) await queue.connect(message.member?.voice.channel as GuildVoiceChannelResolvable);
      } catch (err) {
        player.deleteQueue(message.guild as GuildResolvable);
        return message.channel.send(`I cant join the voice channel ${message.author}`);
      }
      if (result.playlist) result.tracks[0].playlist = result.playlist;
      result.playlist ? await queue.addTracks(result.playlist.tracks) : await queue.addTrack(result.tracks[0]);
      // message.channel.send(`Loading your ${result.playlist ? 'playlist' : 'track'}... `);

      if (!queue.playing) await queue.play();
    }
    function isSpotify(url: string) {
      let re = new RegExp('^(spotify:|https://[a-z]+.spotify.com/)');
      return re.test(url);
    }
    function isYoutube(url: string) {
      return new RegExp('^((http|https)://)?(www.youtube.com|youtu.?be)/((watch?v=)?([a-zA-Z0-9]{11}))(&.*)*$').test(
        url
      );
    }
    (() => exe())();
  }
}
