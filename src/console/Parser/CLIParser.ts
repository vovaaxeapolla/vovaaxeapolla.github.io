import LineData from '@console/Line/LineData';
import { IFunction } from '@console/Modules/Modules';
import { ConsoleStore } from '@src/stores';
import TerminalParser, { Token } from './TerminalParser';

import Modules from '@console/Modules/Modules';

export const CLIFunctions = {
  ...Modules.Help,
  ...Modules.CMD,
};

export class CLIParser {
  private readonly consoleStore: ConsoleStore;

  constructor(consoleStore: ConsoleStore) {
    this.consoleStore = consoleStore;
  }

  async execute(tokens: Token[]) {
    if (tokens.length === 0) {
      return new LineData('error', 'Empty command');
    }

    const command = tokens[0].value;
    const args: string[] = [];
    const flags: Record<string, string | boolean> = {};

    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.isFlag) {
        if (token.value.includes('=')) {
          const [flag, value] = token.value.split('=');
          flags[flag] = value;
        } else if (i + 1 < tokens.length && !tokens[i + 1].isFlag) {
          flags[token.value] = tokens[i + 1].value;
          i++;
        } else {
          flags[token.value] = true;
        }
      } else {
        args.push(token.value);
      }
    }

    const functionEntries = Object.entries<IFunction>(CLIFunctions);

    for (const [fnName, fnObj] of functionEntries) {
      if (fnName === command) {
        try {
          this.consoleStore.lastCommand = command;
          const result = await fnObj.fn({
            args,
            flags,
          });

          return result;
        } catch (e: unknown) {
          if (e instanceof Error) {
            return new LineData('error', e.message);
          }
          return new LineData('error', 'An unknown error occurred');
        }
      }
    }

    return new LineData('error', `Command not found: ${command}`);
  }

  start(text: string) {
    const tokens = TerminalParser.tokenize(text);
    return this.execute(tokens);
  }
}