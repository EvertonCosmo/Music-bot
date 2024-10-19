import { type CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import type { Command } from '../interfaces/command'
import { useQueue } from 'discord-player'

export class StopCommand implements Command {
	public readonly name = 'stop'
	public readonly description = 'Stops the current song'
	public readonly interaction: CommandInteraction
	public readonly data = new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the current song')

	public execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeStopCommand(interaction)
	}
	private async executeStopCommand(interaction: CommandInteraction): Promise<unknown> {
		const queue = useQueue(interaction.guild.id)

		if (!queue.deleted) {
			queue.delete()
		}

		const embed = new EmbedBuilder()
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.avatarURL(),
			})
			.setDescription(
				'**Stopped playing**\nStopped playing the audio and cleared the track queue.',
			)
			.setColor(0x44b868)
		return interaction.reply({
			embeds: [embed],
		})
	}
}
