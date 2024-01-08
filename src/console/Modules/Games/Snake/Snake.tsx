import { useEffect, useRef } from "react";
import SnakeGame from './SnakeGame';

export default function Snake() {

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const game = new SnakeGame(ref.current!, 10);
        game.start();

        return () => {
            game.stop();
        }
    })

    return (
        <div ref={ref}></div>
    )
}