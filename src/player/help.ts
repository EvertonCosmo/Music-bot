import { Message, MessageEmbed } from 'discord.js';
import { ICommand } from 'interfaces/Icommand';

export class HelpCommand implements ICommand {
  execute(message: Message<boolean>, query?: string): void {
    async function exe() {
      const embed = new MessageEmbed();

      embed.setColor('#44b868');
      embed.setDescription(`**Commands:**\n
          - help (show this help)
          - exp (exe: exp @username) remove users from voice channel
          - play (exe: play **song name**)
          - pause 
          - resume
          - clear (clear the queue)
          - stop
          - skip 
          - back
          - remove (exe: remove **song number in queue**)
          - jump (exe: jump **song position on playlist** jump music)
          - lyrics(just show lyrics of current music)
          - queue 
          - disconnect    
          - ping 
          - tg (discord together(Youtube and games on discord ))
      `);
      return message.channel.send({
        embeds: [embed],
      });
    }
    (() => {
      exe();
    })();
  }
}
