import '@styles/App.sass';
import { observer } from 'mobx-react-lite';
import { createContext, useEffect, useState } from 'react';

import { Wins, Menu, Console } from '@components';
import { WinsStore } from '@src/stores';
import { ThemeType } from '@src/types';

type ThemeContextType = { theme: ThemeType; setTheme: React.Dispatch<React.SetStateAction<ThemeType>> };
export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
export const winsStore = new WinsStore();

const getTheme = (): ThemeType => {
  let theme = localStorage.getItem('theme') as ThemeType;

  if (!theme || !Object.values(ThemeType).includes(theme)) {
    localStorage.setItem('theme', ThemeType.default);
    theme = ThemeType.default;
  }

  return theme as ThemeType;
};

export const App = observer(() => {
  const [theme, setTheme] = useState<ThemeType>(getTheme());

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  return (
    <div className="app">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Menu />
        <Console />
        <Wins wins={winsStore.wins} />
      </ThemeContext.Provider>
    </div>
  );
});
