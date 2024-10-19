import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'

import type { Command } from '../interfaces/command'
import { useQueue } from 'discord-player'

export class ResumeCommand implements Command {
	public readonly name = 'resume'
	public readonly description = 'Resumes the current song'
	public readonly interaction: CommandInteraction
	public readonly data = new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the current song')

	public execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeResumeCommand(interaction)
	}
	private async executeResumeCommand(interaction: CommandInteraction): Promise<unknown> {
		const queue = useQueue(interaction.guild.id)

		if (!queue || !queue.isPlaying()) {
			return interaction.reply({
				content: `no music is playing ${interaction.user}`,
				ephemeral: true,
			})
		}

		if (!queue.node.isPaused()) {
			return interaction.reply({
				content: `the track is already playing ${interaction.user}`,
				ephemeral: true,
			})
		}

		queue.node.resume()

		return interaction.reply({
			embeds: [
				{
					title: '▶ Resumed',
					description: `**[${queue.currentTrack.title}](${queue.currentTrack.url})**`,
					color: 0x44b868,
					thumbnail: {
						url: queue
							.currentTrack
							.thumbnail,
					},
				},
			],
		})
	}
}
