import type { Command } from '../interfaces/command'

import {
	BackCommand,
	ClearCommand,
	HelpCommand,
	JumpCommand,
	NowPlayingCommand,
	PauseCommand,
	PingCommand,
	PlayCommand,
	QueueCommand,
	RemoveCommand,
	ResumeCommand,
	SkipCommand,
	StopCommand,
} from '../player'

const commands: { [index: string]: Command } = {
	play: new PlayCommand(),
	skip: new SkipCommand(),
	back: new BackCommand(),
	pause: new PauseCommand(),
	resume: new ResumeCommand(),
	queue: new QueueCommand(),
	stop: new StopCommand(),
	help: new HelpCommand(),
	jump: new JumpCommand(),
	nowplaying: new NowPlayingCommand(),
	remove: new RemoveCommand(),
	ping: new PingCommand(),
	clear: new ClearCommand(),
}

type CommandKey = keyof typeof commands

export const commandKeys: CommandKey[] = Object.keys(commands)

export class CommandFactory {
	public generateCommand(command: CommandKey): Command {
		return commands[command]
	}
}
