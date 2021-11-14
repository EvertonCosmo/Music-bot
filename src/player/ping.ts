import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { ICommand } from 'interfaces/Icommand';

export class PingCommand implements ICommand {
  execute(message: Message<boolean>, query?: string): void {
    async function exe() {
      const embed = new MessageEmbed().setDescription(`Client ping: ${client.ws.ping}`).setColor('#b84e44');
      const embedMessage = await message.channel.send({ embeds: [embed] });
      embed
        .setDescription(
          ` :green_circle: API latency: **${client.ws.ping} ms**\n :orange_circle: Message latency: **${
            embedMessage.createdTimestamp - message.createdTimestamp
          } ms**\n`
        )
        .setColor('#44b868');

      embedMessage.edit({
        embeds: [embed],
      });
    }
    (() => exe())();
  }
}
