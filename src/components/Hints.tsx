import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { ConsoleStore } from '@src/stores';
import CLIFunctions from '../console/Parser/CLIFunctions';
import { IFunction } from '../console/Modules/Modules';

interface HintsProps {
    hints: string[];
    inputRef: React.RefObject<HTMLInputElement>
    consoleRef: React.RefObject<HTMLDivElement>
    input: React.Dispatch<React.SetStateAction<string>>
    consoleStore: ConsoleStore
}

export const Hints: React.FC<HintsProps> = ({ hints, inputRef, consoleRef, input, consoleStore }) => {

    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState(false);

    useEffect(() => {
        if (ref.current && inputRef.current && consoleRef.current) {
            const height = ref.current.getBoundingClientRect().height;
            const bottom = inputRef.current.getBoundingClientRect().bottom - consoleRef.current.getBoundingClientRect().top;
            if (bottom - height <= 0)
                setPos(true);
            else
                setPos(false);
        }
    }, [hints])

    function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {

        let inputValue = e.currentTarget.textContent || '';

        const fns = Object.entries<IFunction>(CLIFunctions);

        for (let i = 0; i < fns.length; i++)
            if (fns[i][0] === inputValue) {
                if (fns[i][1].isExecutable) {
                    consoleStore.doCommand(fns[i][0]);
                    input('');
                } else {
                    input(inputValue + ' ');
                }
            }
    }

    hints = hints.slice(0, 5);

    return (
        <>
            {
                hints.length > 0 &&
                <div className={classNames("console__hints", { 'console__hints-top': !pos, 'console__hints-bottom': pos })} ref={ref}>
                    {hints.map((h) => <button className="console__hints__item" key={h} onClick={clickHandler}>{h}</button>)}
                </div>
            }
        </>
    );
}