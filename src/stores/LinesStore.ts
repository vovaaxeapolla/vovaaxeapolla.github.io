import { makeAutoObservable, observable } from 'mobx';

import LineData from '@console/Line/LineData';

export class LinesStore {
  lines: LineData[] = observable([]);

  constructor() {
    makeAutoObservable(this);
  }

  writeln(line: LineData) {
    if (line) this.lines.push(line);
    else this.lines.push(new LineData('text', ''));
  }

  write(str: string) {
    if (this.lines.at(-1)) {
      this.lines[this.lines.length - 1].add(str);
    } else {
      this.lines.push(new LineData('text', str));
    }
  }

  remove() {
    this.lines.pop();
  }

  clear() {
    this.lines = [];
  }

  slice(n: number) {
    this.lines = this.lines.slice(n);
  }
}
