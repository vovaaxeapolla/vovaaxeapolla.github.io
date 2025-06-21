import LineData from '@console/Line/LineData';

import CMD from './CMD/Functions';
import Help from './Help/Functions';

export interface ICommand {
  args: string[]
  flags: Record<string, string | boolean>
}

export interface IFunction {
  fn: (command: ICommand) => Promise<LineData | LineData[] | void> | LineData | LineData[] | void
  description: string,
  example: string,
  isExecutable: boolean
}

export interface IModule {
  [key: string]: IFunction
}

const Modules = { Help, CMD };

export default Modules;
