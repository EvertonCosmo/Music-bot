import {
	type ChatInputCommandInteraction,
	type CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js'
import type { Command } from '../interfaces/command'
import { useQueue } from 'discord-player'

export class QueueCommand implements Command {
	public readonly name = 'queue'

	public readonly description = 'Shows the queue'

	public readonly interaction: CommandInteraction

	public readonly data = new SlashCommandBuilder().setName('queue').setDescription('Shows the queue')

	public execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
		return this.executeQueueCommand(interaction)
	}
	private async executeQueueCommand(interaction: CommandInteraction): Promise<unknown> {
		const queue = useQueue(interaction.guild.id)

		if (!queue || !queue.isPlaying()) {
			return interaction.reply({
				content: `no music is playing ${interaction.user}`,
				ephemeral: true,
			})
		}

		const tracksRaw = queue.tracks.data

		if (!tracksRaw[0]) {
			return interaction.reply({
				content: `no after the current one ${interaction.user}`,
				ephemeral: true,
			})
		}

		const tracks = queue.tracks.map((track, index) => {
			return `**${index + 1}** - [${track.title}](${track.url}) | ${track.author}(requested by: ${track.requestedBy})`
		})

		const tracksLength = tracksRaw.length

		const nextSongs =
			tracksLength > 20
				? `And **${tracksLength - 20}** other track(s)...`
				: `In the playlist: **${tracksLength}** track(s)...`

		const embed = new EmbedBuilder()
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.avatarURL(),
			})
			.setThumbnail(interaction.guild.iconURL({ size: 2048 }))

			.setColor(0x44b868)
			.setDescription(
				`Now playing **${queue.currentTrack.title}**\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`,
			)
			.setTimestamp()
		return interaction.reply({
			embeds: [embed],
		})
	}
}
