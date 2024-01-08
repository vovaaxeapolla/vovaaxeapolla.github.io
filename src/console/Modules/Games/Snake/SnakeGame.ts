import './Snake.sass';
import Tile from './Utils/Tile';
import Grid from './Utils/Grid';

export default class Snake {

    private body: { x: number, y: number, tile: Tile }[] = [];
    private rootElement: Element;
    private size: number;
    private grid: Grid;
    private isStarted = false;
    private loopId: NodeJS.Timeout | null = null;
    private moveX = 0;
    private moveY = 1;
    private moveDone = true;

    constructor(rootElement: Element, size: number) {
        this.rootElement = rootElement;
        this.size = size;
        this.grid = new Grid(rootElement, size);
    }

    private reset() {
        this.body = [{ x: 5, y: 5, tile: new Tile(this.rootElement, 'snake', 'snake') }];
        this.isStarted = false;
        this.loopId = null;
        this.generateFruit();
    }

    private moveBody() {
        for (let i = this.body.length - 1; i >= 1; i--) {
            const { x, y } = this.body[i - 1];
            this.body[i].x = x;
            this.body[i].y = y;
        }
    }

    private moveHead() {
        if (
            this.body[0].x + this.moveX < 0 ||
            this.body[0].y + this.moveY < 0 ||
            this.body[0].x + this.moveX >= this.size ||
            this.body[0].y + this.moveY >= this.size) {
            this.stop();
            return;
        }
        this.body[0].x = this.body[0].x + this.moveX;
        this.body[0].y = this.body[0].y + this.moveY;
    }

    private setTiles() {
        for (let i = 0; i < this.grid.cells.length; i++) {
            const cell = this.grid.cells[i];
            if (cell.isEmpty())
                continue;
            if (cell.linkedTile?.value !== 'fruit') {
                cell.unlinkTile();
            }
        }

        this.body.forEach(e => {
            this.grid.cells[e.x + e.y * (this.size)].linkTile(e.tile);

        });

    }

    private loop() {

        this.moveBody();
        this.moveHead();

        let { x, y } = this.body[0];
        let n = x + y * this.size;
        if (!this.grid.cells[n].isEmpty()) {

            const cell = this.grid.cells[n];
            const tile = cell.linkedTile;

            switch (tile?.value) {
                case 'fruit':
                    tile.addClass('hide');
                    this.body.push(
                        {
                            x: this.body.at(-1)!.x,
                            y: this.body.at(-1)!.y,
                            tile: new Tile(this.rootElement, 'tail', 'tail')
                        }
                    );
                    this.generateFruit();
                    tile.remove();
                    break;
                case 'tail':
                    this.stop();
                    break;
                case 'snake':
                    console.log('head');
                    break;
                default:
                    break;
            }
        }

        if (this.isStarted) {
            this.setTiles();
            this.moveDone = true;
            this.loopId = setTimeout(this.loop.bind(this), 200);
        }
    }

    public start() {
        if (!this.isStarted) {
            this.grid.clear();
            this.reset();
            this.isStarted = true;
            document.addEventListener('keydown', this.input.bind(this));
            this.loop();
        }
    }

    public stop() {
        if (this.isStarted && this.loopId) {
            document.removeEventListener('keydown', this.input.bind(this));
            clearTimeout(this.loopId);
            this.isStarted = false
            this.loopId = null;
        }
    }

    private input(e: KeyboardEvent) {
        switch (e.code) {
            case 'KeyW':
                if (!this.moveDone) break;
                if (this.moveY !== 0)
                    break;
                this.moveDone = false;
                this.moveX = 0;
                this.moveY = -1;
                break;
            case 'KeyS':
                if (!this.moveDone) break;
                if (this.moveY !== 0)
                    break;
                this.moveDone = false;
                this.moveX = 0;
                this.moveY = 1;
                break;
            case 'KeyA':
                if (!this.moveDone) break;
                if (this.moveX !== 0)
                    break;
                this.moveDone = false;
                this.moveX = -1;
                this.moveY = 0;
                break;
            case 'KeyD':
                if (!this.moveDone) break;
                if (this.moveX !== 0)
                    break;
                this.moveDone = false;
                this.moveX = 1;
                this.moveY = 0;
                break;
            case 'Enter':
                this.stop();
                this.start();
                break;
        }
    }

    private generateFruit() {
        this.grid.getRandomEmptyCell().linkTile(new Tile(this.rootElement, 'fruit', 'fruit'));
    }

}