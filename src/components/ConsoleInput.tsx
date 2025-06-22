import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';

import { Hints } from '@components';
import { CLIFunctions } from '@console/Parser/CLIParser';
import { ConsoleStore } from '@src/stores';

interface IConsoleInputProps {
  consoleRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  consoleStore: ConsoleStore;
  type: 'text' | 'password';
}

export const ConsoleInput: React.FC<IConsoleInputProps> = observer(
  ({ consoleRef, inputRef, consoleStore, type }) => {
    const [hints, setHints] = useState<string[]>([]);
    const [selectedHintIndex, setSelectedHintIndex] = useState(-1);

    const [inputValue, setInputValue] = useState('');

    consoleStore.inputState = [inputValue, setInputValue];

    useEffect(() => {
      const matches = [];

      for (const i in CLIFunctions) {
        if (i.startsWith(inputValue) && inputValue !== '') matches.push(i);
      }

      setHints(matches);
      setSelectedHintIndex(-1);
    }, [inputValue]);

    const KeyboardHandler = (
      event: React.ChangeEvent<HTMLInputElement> &
        React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'Enter' && event.target.value) {
        consoleStore.doCommand(inputValue, true);
        setInputValue('');
        event.target.blur();
        event.target.focus();
        setHints([]);
        setSelectedHintIndex(-1);
      }

      if (event.key === 'Tab') {
        event.preventDefault();

        if (hints.length > 0) {
          const newIndex = (selectedHintIndex + 1) % hints.length;

          setSelectedHintIndex(newIndex);
          setInputValue(hints[newIndex]);
        }
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        if (
          consoleStore.history.previous.length > 0 &&
          consoleStore.history.current - 1 >= 0
        ) {
          consoleStore.setHistoryCurrent(consoleStore.history.current - 1);
          setInputValue(
            consoleStore.history.previous[consoleStore.history.current]
          );
        }
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        if (
          consoleStore.history.previous.length > 0 &&
          consoleStore.history.current + 1 <
          consoleStore.history.previous.length
        ) {
          consoleStore.setHistoryCurrent(consoleStore.history.current + 1);
          setInputValue(
            consoleStore.history.previous[consoleStore.history.current]
          );
        }
      }
    };

    return (
      <div className="console__inputLine">
        <span
          className="unselectable"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {'>>'}
        </span>
        <div className="console__inputLine__wrapper">
          {type !== 'password' && (
            <Hints
              hints={hints}
              inputRef={inputRef}
              consoleRef={consoleRef}
              input={setInputValue}
              consoleStore={consoleStore}
              selectedIndex={selectedHintIndex}
            />
          )}
          <input
            className="console__input"
            type={type}
            value={inputValue}
            ref={inputRef}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={KeyboardHandler}
            autoFocus
          />
        </div>
      </div>
    );
  }
);
