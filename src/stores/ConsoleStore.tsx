import { makeAutoObservable } from 'mobx';
import { Dispatch, RefObject, SetStateAction } from 'react';

import LineData from '@console/Line/LineData';
import CLIParser from '../console/parser/CLIParser';
import { loadingAnim } from '@src/utils';
import { LinesStore } from '@src/stores';

export class ConsoleStore {
  linesStore: LinesStore;
  history: { previous: string[]; current: number } = {
    previous: [],
    current: -1,
  };
  inputLine: RefObject<HTMLInputElement>;
  inputState: [string, Dispatch<SetStateAction<string>>] | null = null;
  inputType: 'text' = 'text';
  lastCommand = '';
  currentDirectory = '/';
  user = 'root';

  constructor(linesStore: LinesStore, inputLine: RefObject<HTMLInputElement>) {
    makeAutoObservable(this);
    this.linesStore = linesStore;
    this.inputLine = inputLine;
  }

  private async do(value: string, animated?: boolean) {
    const newLines = [];
    const ConsoleParser = new CLIParser(this);

    try {
      const p = await ConsoleParser.start(value);

      if (p) {
        if (Array.isArray(p)) {
          for (const i of p) {
            newLines.push(i);
          }
        } else {
          newLines.push(p);
        }
      }
    } catch (e: unknown) {
      this.linesStore.writeln(e as LineData);
    }

    if (animated) {
      loadingAnim(newLines, this.linesStore.writeln.bind(this.linesStore));
    } else {
      newLines.forEach((l) => this.linesStore.writeln(l));
    }
  }

  doCommand(value: string, animated?: boolean) {
    this.linesStore.writeln(
      new LineData(
        'text',
        (
          <>
            <span>{'Entered -> '}</span>
            {value}
          </>
        )
      )
    );

    this.setHistory(
      [...this.history.previous, value],
      this.history.previous.length + 1
    );

    window.history.replaceState(null, 'New Page Title', `/${value}`);

    this.do(value, animated);
  }

  setHistory(previous: string[], current: number) {
    this.history = { previous, current };
  }

  setHistoryPrevious(previous: string[]) {
    this.history = { previous: previous, current: this.history.current };
  }

  setHistoryCurrent(current: number) {
    this.history = { previous: this.history.previous, current: current };
  }

  setInputValue(value: string) {
    if (this.inputState) {
      this.inputState[1](value);
    }
  }
}
