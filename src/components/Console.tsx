import { observer } from 'mobx-react-lite';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';

import { ConsoleInput, ConsoleScreen } from '@components';
import LineData from '@console/Line/LineData';
import { TextCollection } from '@src/console/constants/TextCollection';
import { loadingAnim } from '@src/utils';
import { LinesStore, ConsoleStore } from '@src/stores';

import '@styles/Console.sass';

export const Console = observer(() => {
  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [linesStore] = useState(new LinesStore());
  const [consoleStore] = useState(new ConsoleStore(linesStore, inputRef));
  const location = useLocation();

  useEffect(() => {
    document.title = 'Console';
  }, []);

  useEffect(() => {
    if (location.pathname.slice(1) === '') {
      loadingAnim([
        ...LineData.ParseLines(TextCollection.TITLE),
      ], linesStore.writeln.bind(linesStore));
    } else { consoleStore.doCommand(decodeURIComponent(location.pathname.slice(1))); }
  }, [linesStore]);

  const ConsoleMouseHandler = () => {
    const selection = document.getSelection();

    if (selection?.anchorOffset === selection?.focusOffset && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="console" onMouseUp={ConsoleMouseHandler} ref={consoleRef}>
      <div className="console__container">
        <ConsoleScreen lines={linesStore.lines} />
        <ConsoleInput
          consoleRef={consoleRef}
          inputRef={inputRef}
          consoleStore={consoleStore}
          type={consoleStore.inputType}
        />
      </div>
    </div>
  );
});
