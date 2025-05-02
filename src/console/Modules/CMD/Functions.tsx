import { winsStore } from '@src/App';
import { LineType } from '@src/types';

import LineData from '../../Line/LineData';
import { ICommand, IModule } from '../Modules';

import account from './Account';
import MathParser from './MathParser';

const CMDFunctions: IModule = {
  eval: {
    fn: ({ texts }: ICommand) => {
      // eslint-disable-next-line no-eval
      return new LineData(LineType.TEXT, eval(texts[0]));
    },
    description: 'Выполняет код',
    example: 'eval "1+2"',
  },
  account,
  todo: {
    fn: ({ args, texts }: ICommand) => {
      if (args.length === 0) {
        const todos = JSON.parse(localStorage.getItem('todo'));

        if (todos && todos.length > 0) {
          return todos.map(
            (td: string, i: number) =>
              new LineData(LineType.TEXT, `${i + 1}: ${td}`)
          );
        }

        return new LineData(LineType.TEXT, 'Список дел пуст');
      }

      if (args[0] === 'add' && texts[0]) {
        let todos = JSON.parse(localStorage.getItem('todo'));

        if (!Array.isArray(todos)) {
          todos = [];
        }

        todos.push(texts[0]);
        localStorage.setItem('todo', JSON.stringify(todos));

        return new LineData(LineType.TEXT, 'Задача успешно добавлена');
      }

      if (args[0] === 'remove' && texts[0]) {
        const todos = JSON.parse(localStorage.getItem('todo'));

        if (!Array.isArray(todos)) {
          return new LineData(LineType.TEXT, 'Список дел пуст');
        }

        const newTodos = todos.filter((v, i) => i !== Number(texts[0]) - 1);

        localStorage.setItem('todo', JSON.stringify(newTodos));

        return new LineData(LineType.TEXT, 'Задача успешно удалена');
      }

      return new LineData(LineType.ERROR, 'Функция не реализована');
    },
    description: 'Локальный ToDo лист',
    example: `todo $add 'Новая задача'`,
    isExecutable: true,
  },
  calc: {
    fn: async ({ texts }: ICommand) => {
      const Parser = new MathParser();

      if (texts) {
        const result = Parser.start(texts[0]);

        return new LineData(LineType.TEXT, String(result));
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
  set: {
    fn: async ({ args, texts }: ICommand) => {
      function validURL(str: string) {
        const pattern = new RegExp(
          '^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
          'i'
        );

        return Boolean(pattern.test(str));
      }

      if (args) {
        if (args[0] === 'title') {
          document.title = texts[0];
        }

        if (args[0] === 'bg') {
          if (validURL(texts[0])) {
            document.documentElement.style.setProperty(
              '--console-bg',
              `url('${texts[0]}')`
            );
          } else {
            document.documentElement.style.setProperty(
              '--console-bg',
              `url(../img/main.jpg)`
            );
          }
        }
      }
    },
    description: 'Устанавливает параметры консоли',
    example: 'set $title "New title"',
    isExecutable: false,
  },
  open: {
    fn: async () => {
      winsStore.setWindow(<></>, 'fullscreen');
    },
    description: 'Открывает новое окно',
    example: 'open "123"',
    isExecutable: false,
  },
  weather: {
    fn: async ({ args, texts }: ICommand) => {
      function generateTable(title: string, array: Array<[]>) {
        const maxWidth = 73;
        const maxTitleLength = 19;
        const titleLength = title.length;
        const rows: Array<Array<string | [string, number]>> = [];

        rows.push([
          [' ', Math.floor((maxWidth - maxTitleLength - 2) / 2)],
          '┌',
          ['─', maxTitleLength],
          '┐',
          [' ', Math.floor((maxWidth - maxTitleLength - 2) / 2)],
        ]);
        rows.push([
          [' ', Math.floor((maxWidth - maxTitleLength - 2) / 2)],
          '│',
          [' ', Math.floor((maxTitleLength - titleLength) / 2)],
          title,
          [' ', Math.floor((maxTitleLength - titleLength) / 2)],
          '│',
          [' ', Math.floor((maxWidth - maxTitleLength - 2) / 2)],
        ]);
        rows.push([
          '┌',
          ['─', Math.floor((maxWidth - maxTitleLength - 4) / 2)],
          '┴',
          ['─', maxTitleLength],
          '┴',
          ['─', Math.floor((maxWidth - maxTitleLength - 4) / 2)],
          '┐',
        ]);

        return rows
          .map((row) =>
            row.reduce((p: string, c: string | [string, number]): string => {
              if (typeof c === 'string') {
                return p + c;
              }

              return p + c[0].repeat(c[1]);
            }, '')
          )
          .join('\n');
      }

      const res = await fetch('https://wttr.in/?format=j1');
      const data = await res.json();
      //             const table =
      //                 `
      // ┌──────────────────────────────┬───────────────────────┤ Вс. 22 окт. ├───────────────────────┬──────────────────────────────┐
      // │             Утро             │             День      └──────┬──────┘      Вечер            │             Ночь             │
      // ├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
      // │               Пасмурно       │  _'/ "".-.Местами дождь      │    \  /       Переменная обл…│               Пасмурно       │
      // │      .--.     + 1(-4) °C     │   , \_().   + 2(-3) °C       │  _ / "".-.     - 2(-7) °C    │      .--.     - 2(-8) °C     │
      // │   .-(    ).   ↘ 21 - 24км/ч  │    /(___(__)  ↘ 20-23 км/ч   │    \_().   → 20 - 30 км / ч  │   .-(    ).   → 20 - 29 км/ч │
      // │  (___.__)__) 10 км           │      ‘ ‘ ‘ ‘  10 км          │    /(___(__)  10 км          │  (___.__)__)  10 км          │
      // │               0.0 мм | 0 %   │     ‘ ‘ ‘ ‘   0.0 мм | 61 %  │               0.0 мм | 0 %   │               0.0 мм | 0 %   │
      // └──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘`

      return new LineData(LineType.TEXT, generateTable('123', []));
    },
    description: 'Показывает погоду',
    example: 'weather',
    isExecutable: true,
  },
  palindrome: {
    fn: async ({ texts }: ICommand) => {
      const isPalindrome = texts[0] === texts[0].split('').reverse().join('');

      return new LineData(LineType.TEXT, isPalindrome.toString());
    },
    description: 'Проверяет строку на палиндром',
    example: 'palindrome "123321"',
    isExecutable: false,
  },
  test: {
    fn: async () => {
      async function delay(ms: number) {
        return new Promise((resolve) => setTimeout(() => resolve(1), ms));
      }

      await delay(10000);

      return new LineData(LineType.TEXT, 'test');
    },
    description: 'test',
    example: 'test',
    isExecutable: false,
  },
};

export default CMDFunctions;
