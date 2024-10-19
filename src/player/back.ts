import { useHistory } from 'discord-player'
import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import type { Command } from '../interfaces/command'

export class BackCommand implements Command {
	public readonly name = 'back'
	public readonly description = 'Goes back to the previous song'
	public readonly interaction: CommandInteraction
	public readonly data = new SlashCommandBuilder()
		.setName('back')
		.setDescription('Goes back to the previous song')

	public execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeBackCommand(interaction)
	}

	private async executeBackCommand(interaction: CommandInteraction): Promise<unknown> {
		const history = useHistory(interaction.guild.id)

		if (!history.previousTrack) {
			return interaction.reply({
				content: 'There is no previous track',
				ephemeral: true,
			})
		}

		await history.previous()
	}
}
