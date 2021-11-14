import { Message } from 'discord.js';
import { ICommand } from 'interfaces/Icommand';

export class ExpelledUsers implements ICommand {
  execute(message: Message, query?: string): void {
    async function exe() {
      try {
        const admId = '543145149274783744';

        const usersConnected = message.member.voice.channel.members.each((member) => member);

        const mentionUser = message.mentions.users.first();

        if (!mentionUser.bot && mentionUser.id !== admId) {
          const user = usersConnected.find((el) => el.id === mentionUser.id);

          if (user) {
            await user.voice.disconnect('');
            return await message.channel.send({
              embeds: [
                {
                  description: `**${user.user.username}** has been disconnected`,
                  thumbnail: {
                    url: `${user.displayAvatarURL({ dynamic: true, size: 1024 })}`,
                  },
                },
              ],
            });
          } else {
            return message.channel.send(`<@${mentionUser.id}> is not connected to any voice channel `);
          }
        } else {
          return message.channel.send(`Cannot remove <@${mentionUser.id}>`);
        }
      } catch (err) {
        console.log(err);
      }
    }
    (() => exe())();
  }
}
