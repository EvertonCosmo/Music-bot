import { EmbedBuilder, SlashCommandBuilder, type CommandInteraction } from 'discord.js'
import type { Command } from '../interfaces/command'
import { useQueue } from 'discord-player'

export class NowPlayingCommand implements Command {
	public readonly name = 'nowplaying'
	public readonly description = 'Shows the current song'
	public readonly interaction: CommandInteraction
	public readonly data = new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Shows the current song')

	public execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeNowPlayingCommand(interaction)
	}

	private async executeNowPlayingCommand(interaction: CommandInteraction): Promise<unknown> {
		const queue = useQueue(interaction.guild.id)

		if (!queue || !queue.isPlaying()) {
			return interaction.reply({
				content: `no music is playing ${interaction.user.username}`,
				ephemeral: true,
			})
		}

		const progress = queue.node.createProgressBar({
			timecodes: true,
			length: 8,
		})

		const embed = new EmbedBuilder()
			.setDescription(
				`**[${queue.currentTrack.title}](${queue.currentTrack.url})**`,
			)
			.setThumbnail(queue.currentTrack.thumbnail)
			.addFields({
				name: '⏳ Progress',
				value: progress.replace(/0:00/g, '◉'),
			})
		return interaction.reply({
			embeds: [embed],
		})
	}
}
