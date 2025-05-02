import { typingAnim } from '@src/functions';
import { ConsoleStore } from '@src/stores';
import { LineType } from '@src/types';

import LineData from '../../Line/LineData';
import AsyncInput from '../../parser/AsyncInput';
import { ICommand } from '../Modules';

async function login(consoleStore: ConsoleStore) {
  consoleStore.isBusy = true;
  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, ''));
  typingAnim(
    'Введите ваш логин',
    consoleStore.linesStore.write.bind(consoleStore.linesStore)
  );
  const login: string = await AsyncInput<string>();

  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, login));
  consoleStore.inputType = 'password';
  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, ''));
  typingAnim(
    'Введите ваш пароль',
    consoleStore.linesStore.write.bind(consoleStore.linesStore)
  );
  const password: string = await AsyncInput<string>();

  consoleStore.linesStore.writeln(
    new LineData(LineType.TEXT, '*'.repeat(password.length))
  );
  consoleStore.inputType = 'text';
  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, 'Auth logic'));
  consoleStore.isBusy = false;
}

async function signup(consoleStore: ConsoleStore) {
  consoleStore.isBusy = true;
  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, ''));
  typingAnim(
    'Введите ваш email',
    consoleStore.linesStore.write.bind(consoleStore.linesStore)
  );
  const email: string = await AsyncInput<string>();

  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, email));
  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, ''));
  typingAnim(
    'Введите ваш логин',
    consoleStore.linesStore.write.bind(consoleStore.linesStore)
  );
  const login: string = await AsyncInput<string>();

  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, login));
  consoleStore.inputType = 'password';
  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, ''));
  typingAnim(
    'Введите ваш пароль',
    consoleStore.linesStore.write.bind(consoleStore.linesStore)
  );
  const password: string = await AsyncInput<string>();

  consoleStore.linesStore.writeln(
    new LineData(LineType.TEXT, '*'.repeat(password.length))
  );
  consoleStore.inputType = 'text';
  consoleStore.linesStore.writeln(new LineData(LineType.TEXT, 'Auth logic'));
  consoleStore.isBusy = false;
}

async function profile(profile: string) {
  const data = await fetch(
    `https://fakerapi.it/api/v1/users?_quantity=1&_gender=male`
  );
  const user = (await data.json()).data[0];
  const fields = Object.entries(user);

  // fields.map((f: any) => new LineData(LineType.TEXT, (
  //     <span className="dyer-accent">
  //         {f[0]}:
  //         <span className="dyer-utility">
  //             {f[1]}
  //         </span>
  //     </span>
  // )))

  return new LineData(
    LineType.TEXT,
    (
      <img src="https://fikiwiki.com/uploads/posts/2022-02/1644965605_9-fikiwiki-com-p-kartinki-priroda-na-zastavku-telefona-9.jpg" />
    )
  );
}

const account = {
  fn: function({ consoleStore, args }: ICommand) {
    if (args[0] === 'login') {
      login(consoleStore);

      return;
    }

    if (args[0] === 'signup') {
      signup(consoleStore);

      return;
    }

    if (args[0] === 'profile' && args[1]) {
      profile(args[1]);

      return;
    }
  },
  description: 'Операции связанные с аккаунтами',
  example: 'account',
  isExecutable: false,
};

export default account;
