export default class Tile {

    private tile: Element;
    public value: any

    constructor(rootElement: Element, value?: any, className?: string) {
        this.tile = document.createElement('div');
        this.tile.classList.add('tile');
        this.value = value;
        if (className)
            this.tile.classList.add('tile', ...className!.split(' '));
        rootElement.append(this.tile);
    }

    public setXY(x: number, y: number) {
        this.tile.setAttribute('style', `
        --x: ${x};
        --y: ${y};`
        );
    }

    public addClass(...className: string[]) {
        this.tile.classList.add(...className)
    }

    public remove() {
        this.tile.remove();
    }

    public animationend(callback: EventListenerOrEventListenerObject) {
        this.tile.addEventListener('animationend', callback, { once: true });
    }


    public transitionend(callback: EventListenerOrEventListenerObject) {
        this.tile.addEventListener('transitionend', callback, { once: true });
    }
}