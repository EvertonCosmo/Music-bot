import type { CommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js'

export interface SlashCommand {
	name: string
	description: string
	required: boolean
	options: Array<{
		name: string
		description: string
		required: boolean
	}>
}

export interface Command {
	name: string

	interaction?: CommandInteraction

	description: string

	data: SlashCommandOptionsOnlyBuilder

	execute(interaction: CommandInteraction): Promise<unknown>
}
