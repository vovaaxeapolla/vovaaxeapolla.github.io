import LineData from '../../Line/LineData';
import { ICommand, IModule } from '../Modules';

import MathParser from './MathParser';
import LinkedList from './LinkedList';

const CMDFunctions: IModule = {
  trie: {
    fn: async () => {
      const output: string[] = [];

      return new LineData('text', 'Not implemented');
    },
    description: 'Not implemented',
    example: 'Not implemented',
    isExecutable: false,
  },
  whoami: {
    fn: async () => {},
    description: 'Калькулятор',
    example: 'calc "1+2*3/4^5sqrt(6)"',
    isExecutable: false,
  },
  pwd: {
    fn: async () => {},
    description: 'Калькулятор',
    example: 'calc "1+2*3/4^5sqrt(6)"',
    isExecutable: false,
  },
  cd: {
    fn: async () => {},
    description: 'Калькулятор',
    example: 'calc "1+2*3/4^5sqrt(6)"',
    isExecutable: false,
  },
  calc: {
    fn: async ({ args }: ICommand) => {
      const Parser = new MathParser();

      if (args) {
        const result = Parser.start(args[0]);

        return new LineData('text', String(result));
      }
    },
    description: 'Калькулятор',
    example: 'calc "1+2*3/4^5sqrt(6)"',
    isExecutable: false,
  },
  clear: {
    fn: async ({ consoleStore }: ICommand) => {
      consoleStore.linesStore.clear();
    },
    description: 'Очищает консоль',
    example: 'clear',
    isExecutable: true,
  },
  wipe: {
    fn: async ({ consoleStore }: ICommand) => {
      consoleStore.setHistory([], -1);
    },
    description: 'Очищает историю команд',
    example: 'wipe',
    isExecutable: false,
  },
  test: {
    fn: async () => {
      const list = LinkedList.fromArray([1, 2, 3, 4, 5]);

      return new LineData('text', list?.toString());
    },
    description: 'test',
    example: 'test',
    isExecutable: false,
  },
};

export default CMDFunctions;
