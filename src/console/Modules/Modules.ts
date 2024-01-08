import LineData from '@console/Line/LineData';
import { ConsoleStore } from '@src/stores';

import AI from './AI/Functions';
import CMD from './CMD/Functions';
import Games from './Games/Functions';
import Help from './Help/Functions';

export interface ICommand {
  consoleStore: ConsoleStore
  args: string[]
  texts: string[]
}

export interface IFunction {
  fn: ({ }: ICommand) => Promise<LineData | LineData[] | void>
  description: string,
  example: string,
  isExecutable: boolean
}

export interface IModule {
  [key: string]: IFunction
}

const Modules = { Help, CMD, Games, AI };

export default Modules;
