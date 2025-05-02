import LineData from '@console/Line/LineData';
import { IFunction } from '@console/Modules/Modules';
import CLIFunctions from '@console/parser/CLIFunctions';
import Token from '@console/parser/token/Token';
import TokenType from '@console/parser/token/TokenType';
import { ConsoleStore } from '@src/stores';
import { LineType } from '@src/types';

export default class CLIParser {
  private tokens: Token[] = [];
  private readonly consoleStore: ConsoleStore;

  TypesList = {
    'FUNCTION': new TokenType('FUNCTION', new RegExp(`^[a-zA-Zа-яА-Я]+`)),
    'TEXT': new TokenType('TEXT', new RegExp(`^["'].*?["']`)),
    'ARGUMENT': new TokenType('ARGUMENT', new RegExp('^\\$([a-z]|[A-Z]|[а-я]|[А-Я]|\\d)+')),
    'SPACE': new TokenType('SPACE', new RegExp('^\\s+')),
    'ERROR': new TokenType('ERROR', new RegExp('^')),
  };

  constructor(consoleStore: ConsoleStore) {
    this.consoleStore = consoleStore;
  }

  tokenize(text: string): Token[] {
    let pos = 0;
    const tokens = [];
    const tokenTypeList = Object.values(this.TypesList);

    while (pos < text.length) {
      for (let i = 0; i < tokenTypeList.length; i++) {
        const tokenType = tokenTypeList[i];
        const regexp = tokenType.regexp;
        const result = text.slice(pos).match(regexp);

        if (result && result[0]) {
          let r = null;

          if (tokenType.name === this.TypesList.TEXT.name) {
            r = result[0].replace(/"|'|\$/g, '');
          } else {
            r = result[0].replace(/"|'|\$|-/g, '');
          }

          const token = new Token(tokenType, r);

          pos += result[0].length;
          tokens.push(token);
          break;
        }

        if (i === tokenTypeList.length - 1) {
          throw new LineData(LineType.ERROR, 'Неизвестный токен');
        }
      }
    }

    return tokens;
  }

  async execute(tokens: Token[]) {
    if (tokens[0].type.name === this.TypesList.ERROR.name) { return new LineData(LineType.ERROR, tokens.join('\n')); }

    let pos = 1;
    let fn = null;
    const args = [];
    const texts = [];

    if (0 < tokens.length && tokens[0].type.name === this.TypesList.FUNCTION.name) { fn = tokens[0].text; } else { return new LineData(LineType.ERROR, 'Синтаксическая ошибка. Строка должна начинаться с функции!'); }

    while (pos < tokens.length) {
      switch (tokens[pos].type.name) {
        case this.TypesList.ARGUMENT.name:
          args.push(tokens[pos].text);
          break;

        case this.TypesList.TEXT.name:
          texts.push(tokens[pos].text);
          break;

        default:
          break;
      }

      pos++;
    }

    const fns = Object.entries<IFunction>(CLIFunctions);

    for (let i = 0; i < fns.length; i++) {
      if (fns[i][0] === fn) {
        try {
          this.consoleStore.lastCommand = fn;
          const result = await fns[i][1].fn({ consoleStore: this.consoleStore, args, texts });

          return result;
        } catch (e: unknown) {
          if (e instanceof Error) {
            return new LineData(LineType.ERROR, e.message);
          }

          return new LineData(LineType.ERROR, 'An unknown error occurred');
        }
      }
    }

    return new LineData(LineType.ERROR, `Что такое ${fn}? Я не знаю!`);
  }

  start(text: string) {
    this.tokens = this.tokenize(text);

    return this.execute(this.tokens.filter((token) => token.type.name !== this.TypesList.SPACE.name));
  }
}
