import classNames from 'classnames';
import { useRef, useState, useEffect } from 'react';

import { IFunction } from '@console/Modules/Modules';
import CLIFunctions from '../console/parser/CLIFunctions';
import { ConsoleStore } from '@src/stores';

interface IHintsProps {
  hints: string[];
  inputRef: React.RefObject<HTMLInputElement>;
  consoleRef: React.RefObject<HTMLDivElement>;
  input: (value: string) => void;
  consoleStore: ConsoleStore;
  selectedIndex: number;
}

export const Hints: React.FC<IHintsProps> = ({
  hints,
  inputRef,
  consoleRef,
  input,
  consoleStore,
  selectedIndex,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(false);

  useEffect(() => {
    if (ref.current && inputRef.current && consoleRef.current) {
      const height = ref.current.getBoundingClientRect().height;
      const bottom =
        inputRef.current.getBoundingClientRect().bottom -
        consoleRef.current.getBoundingClientRect().top;

      if (bottom - height <= 0) {
        setPos(true);
      } else {
        setPos(false);
      }
    }
  }, [hints]);

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const inputValue = e.currentTarget.textContent || '';

    const fns = Object.entries<IFunction>(CLIFunctions);

    for (let i = 0; i < fns.length; i++) {
      if (fns[i][0] === inputValue) {
        if (fns[i][1].isExecutable) {
          consoleStore.doCommand(fns[i][0]);
          input('');
        } else {
          input(`${inputValue} `);
        }
      }
    }
  }

  return (
    <>
      {hints.length > 0 && (
        <div
          className={classNames('console__hints', {
            'console__hints-top': !pos,
            'console__hints-bottom': pos,
          })}
          ref={ref}
        >
          {hints.slice(0, 5).map((h, index) => (
            <button
              key={h}
              className={classNames('console__hints__item', {
                'console__hints__item-selected': index === selectedIndex,
              })}
              onClick={clickHandler}
            >
              {h}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
