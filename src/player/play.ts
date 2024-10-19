import { QueryType, QueueRepeatMode, useMainPlayer } from 'discord-player'
import { type ChatInputCommandInteraction, type CommandInteraction, SlashCommandBuilder } from 'discord.js'

import type { Command } from '../interfaces/command'

export class PlayCommand implements Command {
	public readonly name: string = 'play'

	public readonly description: string = 'Plays a song'

	public readonly interaction: CommandInteraction

	public readonly data = new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
		.addStringOption((option) =>
			option
				.setName('song')
				.setDescription(
					'The song you want to play',
				)
				.setRequired(true),
		)

	public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
		return this.executePlayCommand(interaction)
	}

	private async executePlayCommand(interaction: ChatInputCommandInteraction): Promise<unknown> {
		await interaction.deferReply()
		const player = useMainPlayer()

		const { channel } = interaction.guild.members.cache.get(
			interaction.user.id,
		).voice

		if (channel == null) {
			return interaction.reply({
				embeds: [
					{
						description: 'You are not in a voice channel!',
						color: 0xb84e44,
					},
				],
			})
		}

		const query = interaction.options.getString('song')

		console.log('QUERY DATA', query)

		const result = await player.search(query, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO,
		})

		if (!result.hasTracks()) {
			return interaction.editReply({
				content: `No results found for **${query}**`,
			})
		}

		try {
			await player.play(channel, result, {
				nodeOptions: {
					volume: 100,
					leaveOnEnd: false,
					repeatMode: QueueRepeatMode.OFF,
					metadata: {
						channel: interaction.channel,
					},
				},

				requestedBy: interaction.user,
				connectionOptions: {
					deaf: true,
				},
			})

			return interaction.editReply({
				content: `Track ${result.tracks[0].title} added to the queue ✅`,
			})
		} catch (error) {
			interaction.reply({
				embeds: [
					{
						description: 'Error while playing:',
						color: 0xb84e44,
						fields: [
							{
								name: 'Error',
								value: error.message,
							},
						],
					},
				],
			})
		}
	}
}
