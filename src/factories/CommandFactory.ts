import { ICommand } from 'interfaces/Icommand';

import {
  BackCommand,
  DisconnectCommand,
  ExpelledUsers,
  PauseCommand,
  PlayCommand,
  QueueCommand,
  ResumeCommand,
  SkipCommand,
  StopCommand,
  LyricsCommand,
  HelpCommand,
  JumpCommand,
  NowPlayingCommand,
  RemoveCommand,
  PingCommand,
  ClearCommand,
  TogetherCommand,
} from '../player';

const commands: { [index: string]: ICommand } = {
  play: new PlayCommand(),
  skip: new SkipCommand(),
  exp: new ExpelledUsers(),
  back: new BackCommand(),
  pause: new PauseCommand(),
  resume: new ResumeCommand(),
  queue: new QueueCommand(),
  stop: new StopCommand(),
  disconnect: new DisconnectCommand(),
  lyrics: new LyricsCommand(),
  help: new HelpCommand(),
  jump: new JumpCommand(),
  nowplaying: new NowPlayingCommand(),
  remove: new RemoveCommand(),
  ping: new PingCommand(),
  clear: new ClearCommand(),
  tg: new TogetherCommand(),
};
export class CommandFactory {
  public generateCommand(command: string): ICommand {
    return commands[command];
  }
}
