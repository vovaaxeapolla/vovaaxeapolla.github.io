import LineData from "@console/Line/LineData";
import { LineType } from "@src/types";
import { makeAutoObservable, observable } from "mobx";

export class LinesStore {

    lines: LineData[] = observable([]);

    constructor() {
        makeAutoObservable(this);
    }

    writeln(line: LineData) {
        if (line)
            this.lines.push(line)
        else
            this.lines.push(new LineData(LineType.TEXT, ''))
    }

    write(str: string) {
        if (this.lines.at(-1)) {
            this.lines[this.lines.length - 1].add(str);
        } else {
            this.lines.push(new LineData(LineType.TEXT, str));
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