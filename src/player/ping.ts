import { type CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'

import type { Command } from '../interfaces/command'

export class PingCommand implements Command {
	public readonly name: string = 'ping'

	public readonly description: string = 'Shows the ping'

	public readonly interaction: CommandInteraction

	public readonly data = new SlashCommandBuilder().setName('ping').setDescription('Shows the ping')

	execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executePingCommand(interaction)
	}

	private async executePingCommand(interaction: CommandInteraction): Promise<unknown> {
		const embed = new EmbedBuilder()
			.setDescription(
				`Client ping: ${interaction.client.ws.ping}`,
			)
			.setColor('#b84e44')

		const embedMessage = await interaction.reply({
			embeds: [embed],
		})
		embedMessage.edit({
			embeds: [
				embed
					.setDescription(
						` :green_circle: API latency: **${interaction.client.ws.ping} ms**\n :orange_circle: Message latency: **${
							embedMessage.createdTimestamp -
							interaction.createdTimestamp
						} ms**\n`,
					)
					.setColor(
						'#44b868',
					),
			],
		})
		return
	}
}
