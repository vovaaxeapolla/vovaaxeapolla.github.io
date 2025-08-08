import highlightSyntaxToJSX from '@src/modules/utils/highlightSyntaxToJSX';
import LineData from '../../Line/LineData';
import { ICommand, IModule } from '../Modules';

import MathParser from './MathParser';

const CMDFunctions: IModule = {
  whoami: {
    fn: async () => {
      return new LineData('text', highlightSyntaxToJSX('help -a --abc-def'));
    },
    description: 'Not implemented',
    example: 'Not implemented',
    isExecutable: false,
  },
  calc: {
    fn: async ({ args, flags }: ICommand) => {
      const mathParser = new MathParser();

      if (flags['-t']) {
        const tokens = mathParser.tokenize(args[0])

        return new LineData('text', String(tokens.map((token) => `${token.text} | ${token.type.name}`).join('\n')));
      }

      if (args) {
        const result = mathParser.start(args[0]);

        return new LineData('text', String(result));
      }
    },
    description: 'Калькулятор',
    example: 'calc "1+2*3/4^5sqrt(6)"',
    isExecutable: false,
  },
};

export default CMDFunctions;
