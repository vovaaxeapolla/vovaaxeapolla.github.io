import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import styles from './TicTacToe.module.sass';

interface ISquare {
    value: null | 'X' | 'O'
    hoverValue: 'X' | 'O'
    onClick: MouseEventHandler
}

interface IGrid {
    squares: Array<ISquare["value"]>
    onClick: Function
    hoverValue: 'X' | 'O'
}

const Cell: FC<ISquare> = ({ value, onClick, hoverValue }) => {

    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);

    return (
        <button
            className={styles.cell}
            onClick={onClick}
            onMouseMove={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)} >
            {value}
            {hovered && !value && <span ref={ref} className={styles.cellHover}>{hoverValue}</span>}
        </button >
    );
}

const Grid: FC<IGrid> = ({ squares, onClick, hoverValue }) => {

    return (
        <div className={styles.grid}>
            <div className={styles.row}>
                <Cell value={squares[0]} onClick={() => onClick(0)} hoverValue={hoverValue} />
                <Cell value={squares[1]} onClick={() => onClick(1)} hoverValue={hoverValue} />
                <Cell value={squares[2]} onClick={() => onClick(2)} hoverValue={hoverValue} />
            </div>
            <div className={styles.row}>
                <Cell value={squares[3]} onClick={() => onClick(3)} hoverValue={hoverValue} />
                <Cell value={squares[4]} onClick={() => onClick(4)} hoverValue={hoverValue} />
                <Cell value={squares[5]} onClick={() => onClick(5)} hoverValue={hoverValue} />
            </div>
            <div className={styles.row}>
                <Cell value={squares[6]} onClick={() => onClick(6)} hoverValue={hoverValue} />
                <Cell value={squares[7]} onClick={() => onClick(7)} hoverValue={hoverValue} />
                <Cell value={squares[8]} onClick={() => onClick(8)} hoverValue={hoverValue} />
            </div>
        </div>
    );
}

export default function TicTacToe() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [computer, setComputer] = useState(false);
    const [turn, setTurn] = useState<'X' | 'O'>('O');

    function clickHandler(i: number) {
        setSquares(prev => prev.map((e, j) => j === i && e === null ? turn : e));
        setTurn(p => p === 'X' ? 'O' : 'X');
    }

    function reset() {
        setTurn('O');
        setSquares(Array(9).fill(null));
    }

    useEffect(() => {
        if (turn === 'X' && !winner && computer) {
            setSquares(computeTurn(squares, turn));
            setTurn(p => p === 'X' ? 'O' : 'X');
        }
    }, [turn])

    const winner = calculateWinner(squares);

    return (
        <div className={styles.TicTacToe}>
            {winner && 'Победитель:' + winner}
            <Grid squares={squares} onClick={clickHandler} hoverValue={turn} />
            <div className={styles.controllers}>
                <button onClick={reset}>Заново</button>
                <input id='computer' name='computer' type='checkbox' onChange={() => setComputer(p => !p)} />
                <label htmlFor="computer">
                    Компьютер
                </label>
            </div>
        </div>
    );
}

function calculateWinner(squares: ISquare[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function computeTurn(squares: Array<'X' | 'O' | null>, turn: 'X' | 'O'): Array<'X' | 'O' | null> {

    const emptySquares = squares.map<number | null>((s, i) => s === null ? i : null).filter(i => i !== null);
    const result = [...squares];
    result[emptySquares[Math.floor(Math.random() * emptySquares.length)]!] = turn;
    return result;

}