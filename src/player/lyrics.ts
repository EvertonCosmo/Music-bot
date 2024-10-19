import { type CommandInteraction, type Message, SlashCommandBuilder } from 'discord.js'

import type { Command } from '../interfaces/command'

export class LyricsCommand implements Command {
	public readonly name: string = 'lyrics'
	public readonly description: string = 'Shows the lyrics of the current song'
	public readonly interaction: CommandInteraction

	public readonly data = new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Shows the lyrics of the current song')

	public async execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeLyricsCommand(interaction)
	}
	private async executeLyricsCommand(interaction: CommandInteraction): Promise<unknown> {
		return Error('Not implemented yet')
	}
}
