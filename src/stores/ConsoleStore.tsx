import { makeAutoObservable } from 'mobx';
import { RefObject } from 'react';

import LineData from '@console/Line/LineData';
import CLIParser from '@console/Parser/CLIParser';
import Emitter from '@console/Parser/Emitter';
import { loadingAnim } from '@src/functions';
import { LinesStore } from '@src/stores';
import { LineType } from '@src/types';

export class ConsoleStore {
  linesStore: LinesStore;
  version = 'Version 14.01.2023';
  history: { previous: string[], current: number } = { previous: [], current: -1 };
  inputLine: RefObject<HTMLInputElement>;
  inputState: any;
  inputType: 'text' | 'password' = 'text';
  lastCommand = '';
  isBusy = false;

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
          for (const i of p) { newLines.push(i); }
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
    if (this.isBusy) {
      Emitter.emit('input', [value]);
    } else {
      this.linesStore.writeln(new LineData(LineType.TEXT, <><span>{'Entered -> '}</span>{value}</>));

      if (this.inputType === 'password') {
        this.linesStore.writeln(new LineData(LineType.TEXT, '*'.repeat(value.length)));
      } else {
        this.setHistory(
          [...this.history.previous, value],
          this.history.previous.length + 1
        );
      }

      if (!(this.inputType === 'password')) { window.history.replaceState(null, 'New Page Title', `/${value}`); }

      this.do(value, animated);
    }
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
