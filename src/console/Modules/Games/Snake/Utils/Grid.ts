import Cell from "./Cell";

export default class Grid {

    private _cells: Cell[] = [] as Cell[];

    constructor(rootElement: Element, size: number) {
        rootElement.classList.add('grid');
        for (let i = 0; i < size * size; i++) {
            this._cells.push(new Cell(rootElement, i % size, Math.floor(i / size)));
        }
        rootElement.setAttribute('style', `
        --size: ${size}; 
        --cell-size: calc( 95% / (${size}));
        --cell-gap: calc( 5% / (${size - 1}));`
        );
    }

    public getRandomEmptyCell() {
        const emptyCells = this._cells.filter(cell => cell.isEmpty());
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }


    public get cells(): Cell[] {
        return this._cells;
    }

    public clear() {
        this._cells.forEach(c => {
            c.linkedTile?.remove();
            c.unlinkTile();
        })
    }

    public onCellClick() {

    }

}