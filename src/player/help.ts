import { type CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import type { Command } from '../interfaces/command'

export class HelpCommand implements Command {
	public readonly name: string = 'help'

	public readonly description: string = 'Shows the help'

	public readonly interaction: CommandInteraction

	public readonly data = new SlashCommandBuilder().setName('help').setDescription('Shows the help')

	execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeHelpCommand(interaction)
	}

	private async executeHelpCommand(interaction: CommandInteraction): Promise<unknown> {
		const embed = new EmbedBuilder().setColor('#44b868').setDescription(`**Options:**\n
          - skip (exe: skip **song name**)
          - back
          - remove (exe: remove **song number in queue**)
          - jump (exe: jump **song position on playlist** jump music)
          - lyrics(just show lyrics of current music)
          - queue 
          - disconnect    
          - ping 
          
      `)

		return interaction.reply({
			embeds: [embed],
		})
	}
}
