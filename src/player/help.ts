import { Message, EmbedBuilder, TextChannel } from "discord.js";
import { ICommand } from "interfaces/Icommand";

export class HelpCommand implements ICommand {
	        execute(message: Message, query?: string) {
		this.executeHelpCommand(message, query);
	}

	private async executeHelpCommand(
		message: Message,
		query?: string,
	): Promise<void> {
		try {
			const embed = new EmbedBuilder();

			embed.setColor("#44b868");
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
			if (message.channel instanceof TextChannel) {
				message.channel.send({ embeds: [embed] });
			}
		} catch (error) {
			console.log(error);
		}
	}
}
