import React, { useState } from 'react';

import { Tabs } from '@components';
import { consoleDay, consoleDefault, consoleNight } from '@images';

import '@styles/Menu.sass';

export const Menu = () => {
  const [opened, setOpened] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [fontSize, setFontSize] = useState('16');
  const [page, setPage] = useState('0');

  const fontSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.currentTarget.value;

    document.documentElement.style.setProperty('--console-fontSize', `${size}px`);
    setFontSize(size);
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const themeHandler = (theme: string) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('theme', theme);
  };

  return (
    <div className={`menu${opened ? ' menu-opened' : ''}`}
      onClick={clickHandler}>
      <button className="menu__button" onClick={() => setOpened((p) => !p)}>
        <div></div>
      </button>
      <div className="menu__container">
        <Tabs tab={page} setTab={setPage} />
        <div className="menu__content" data-page={page}>
          <div className="menu__page">
            <div className="menu__item">
              <label htmlFor="">
                Размер шрифта в консоли
                < input type="range" value={fontSize} min={10} max={24} onChange={fontSizeHandler} />
              </label>
              {fontSize}
            </div>
          </div>
          <div className="menu__page">
            <div className="menu__item">
              Темы
              <div
                className={`menu__console${theme === 'default' ? ' menu__console-active' : ''}`}
                onClick={() => themeHandler('default')}
              >
                <img src={consoleDefault} alt="" />
              </div>
              <div
                className={`menu__console${theme === 'night' ? ' menu__console-active' : ''}`}
                onClick={() => themeHandler('night')}
              >
                <img src={consoleNight} alt="" />
              </div>
              <div
                className={`menu__console${theme === 'day' ? ' menu__console-active' : ''}`}
                onClick={() => themeHandler('day')}
              >
                <img src={consoleDay} alt="" />
              </div>
            </div>
          </div>
          <div className="menu__page">
          </div>
        </div>
      </div>
    </div >
  );
};
