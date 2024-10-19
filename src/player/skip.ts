import {
	type CacheType,
	type ChatInputCommandInteraction,
	type CommandInteraction,
	SlashCommandBuilder,
} from 'discord.js'
import type { Command } from '../interfaces/command'
import { useQueue } from 'discord-player'

export class SkipCommand implements Command {
	voiceChannel?: boolean
	public readonly name: string = 'skip'

	public readonly description: string = 'Skips the current song'

	public readonly interaction: ChatInputCommandInteraction<CacheType>

	public readonly data = new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current song')

	execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeSkipCommand(interaction)
	}

	private async executeSkipCommand(interaction: CommandInteraction): Promise<unknown> {
		const queue = useQueue(interaction.guild.id)
		if (!queue || !queue.isPlaying()) {
			return interaction.reply({
				content: `no music is playing ${interaction.user}`,
				ephemeral: true,
			})
		}

		queue.node.skip()
		const message = await interaction.reply({
			content: `skipped ${interaction.user.username}`,
			ephemeral: true,
		})

		setTimeout(() => {
			message.delete()
		}, 5000)
	}
}
