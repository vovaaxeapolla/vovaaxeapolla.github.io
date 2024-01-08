import React from "react";
import styles from '@styles/Line.module.sass';
import { LineType } from '@src/types';
import { observer } from "mobx-react-lite";

interface LineProps {
    type: LineType,
    children: React.ReactNode
    className: string
}

export const Line = observer(({ type, children, className = '' }: LineProps) => {
    function handler() {
        switch (type) {
            case LineType.TEXT:
                return <span>{children}</span>;
            case LineType.BREAK:
                return (
                    <div className={styles.break + ' ' + className}>
                        ---{children ? " " : ""}{children}{children ? " " : ""}{"".padEnd(512, '-')}
                    </div>);
            case LineType.SPACE:
                return '';
            case LineType.ERROR:
                return <span className='dyer-error'>{children}</span>;
            case LineType.SUCCESS:
                return <span className='dyer-success'>{children}</span>;
            default:
                return <span className='dyer-error'>Ошибка! Несуществующее определение строки!</span>;
        }
    }
    return (
        <pre className={styles.line}>
            {handler()}
        </pre>
    );
})
