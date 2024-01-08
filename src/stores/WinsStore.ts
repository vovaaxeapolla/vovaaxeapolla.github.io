import { makeAutoObservable, observable } from 'mobx';

export interface IWin {
  id: string
  close: React.MouseEventHandler<HTMLButtonElement>
  title?: string
  element: JSX.Element
  type: 'fullscreen' | 'common'
}

export class WinsStore {
  wins: IWin[] = observable([]);

  constructor() {
    makeAutoObservable(this);
  }

  setWindow(element: JSX.Element, type: 'fullscreen' | 'common', title?: string) {
    const id = `${Date.now()}`;

    this.wins.push({ id: id, close: () => this.removeWindow(id), title: title, element: element, type: type });
  }

  removeWindow(id: string) {
    this.wins = this.wins.filter((w) => w.id !== id);
  }
}
