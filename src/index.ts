import './moduleAliasImport';
import { config } from 'dotenv';

import { env } from '@config/globals';
import { Client, Intents } from 'discord.js';
import { Player } from 'discord-player';
import { CommandFactory } from './factories/CommandFactory';
import { prefixs } from './constants/prefixs';
import { Lyrics } from '@discord-player/extractor';

const _importDynamic = new Function('modulePath', 'return import(modulePath)');
config();
async function fetch(...args: any) {
  const { default: fetch } = await _importDynamic('node-fetch');
  return fetch(...args);
}
// const fetch = (...args: any) => import('node-fetch').then((module) => module.default(...args));
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const lyricsToken = process.env.NODE_ENV === 'production' ? process.env.GENIUS_TOKEN : env.GENIUS_TOKEN;
const lyrics = Lyrics.init(lyricsToken);

const Factory = new CommandFactory();
const player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 27,
    dlChunkSize: 0,
  },
});
import './player/events';

const token = process.env.NODE_ENV === 'production' ? process.env.TOKEN : env.TOKEN;
client.login(token);

client.on('ready', (message) => {
  client.user?.setActivity('>help', {
    type: 'LISTENING',
  });
  console.log('bot started');
});

client.on('error', console.error);
client.on('messageCreate', (message) => {
  try {
    if (message.author.bot) return;
    const prefix: string = message.content.split(' ').shift()!.toLowerCase();
    if (prefix.charAt(0) !== '>') return;
    if (!prefixs[prefix?.slice(1)]) message.reply('Unknown command!');

    const command = Factory.generateCommand(prefix.slice(1));

    const query = message.content.slice(prefix.length).trim().split(/ +/g);
    command.execute(message, query.join().replaceAll(',', ' '));
  } catch (err) {
    console.log({ err });
  }
});

client.on('interactionCreate', async (interaction: any) => {
  if (interaction.isSelectMenu() && interaction.customId === 'together') {
    try {
      await fetch(`https://discord.com/api/v8/channels/${interaction?.member.voice.channel?.id}/invites`, {
        method: 'POST',
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: interaction.values[0],
          target_type: 2,
          temporary: false,
          validate: null,
        }),
        headers: {
          Authorization: `Bot ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((invite) => {
          if (invite?.error || !invite?.code || Number(invite?.code) === 50013) {
            return console.log(
              `(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`
            );
          }
          interaction.channel.send(`${interaction.member} https://discord.com/invite/${invite.code}`);
          interaction.deferUpdate();
        });
    } catch (err) {
      console.log({ err });
      console.log(`(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`);
    }
  }
});

// client.on('voiceStateUpdate', (oldState, newState) => {
//   console.log({ oldState, newState });
// });
export { client, player, lyrics };
