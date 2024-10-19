import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'
import type { Command } from '../interfaces/command'
import { useQueue } from 'discord-player'

export class PauseCommand implements Command {
	public readonly name = 'pause'
	public readonly description = 'Pauses the current song'
	public readonly interaction: CommandInteraction
	public readonly data = new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the current song')

	public execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executePauseCommand(interaction)
	}
	private async executePauseCommand(interaction: CommandInteraction): Promise<unknown> {
		const queue = useQueue(interaction.guild.id)

		if (!queue || !queue.isPlaying()) {
			return interaction.reply({
				content: `no music is playing ${interaction.user}`,
				ephemeral: true,
			})
		}

		queue.node.pause()

		return interaction.reply({
			embeds: [
				{
					title: '⏸ Paused',
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
