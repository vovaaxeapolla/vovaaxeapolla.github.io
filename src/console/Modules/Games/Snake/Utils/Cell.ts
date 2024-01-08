import Tile from "./Tile";

export default class Cell {

    private x: number;
    private y: number;
    public linkedTile: Tile | null = null;
    public linkedTileForReplacement: Tile | null = null;

    constructor(rootElement: Element, x: number, y: number) {
        this.x = x;
        this.y = y;
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('style', `
        --x: ${x};
        --y: ${y};`
        );
        rootElement.append(cell);
    }

    public linkTile(tile: Tile) {
        tile.setXY(this.x, this.y);
        this.linkedTile = tile;
    }

    public unlinkTile() {
        this.linkedTile = null;
    }

    public isEmpty() {
        return !this.linkedTile;
    }

    public linkTileForReplacement(tile: Tile) {
        this.linkedTileForReplacement = tile;
    }

    public replaceTiles() {
        if (this.linkedTileForReplacement) {
            this.linkTile(this.linkedTileForReplacement);
            this.linkedTileForReplacement = null;
        }
    }

}