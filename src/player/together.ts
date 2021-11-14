import { activities } from '@config/togetherActivities';
import { Message, MessageActionRow, MessageSelectMenu } from 'discord.js';
import { ICommand } from 'interfaces/Icommand';

export class TogetherCommand implements ICommand {
  execute(message: Message<boolean>, query?: string): void {
    async function exe() {
      const r = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId('together')
          .setPlaceholder('Choose a activity')
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions(activities)
      );
      message.channel.send({
        embeds: [
          {
            author: {
              name: 'Discord Together',
              iconURL: message.guild.iconURL(),
            },
            description: `Choose an activity below!`,
            footer: {
              text: 'You must be in a voice channel and on a desktop to use this feature.',
            },
            color: 0x44b868,
          },
        ],
        components: [r],
      });
    }
    (() => exe())();
  }
}
