import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from '@components/console/Line.module.sass';

interface ILineProps {
  type: string;
  children?: React.ReactNode;
  className?: string;
}

export const Line = observer(
  ({ type, children, className = '' }: ILineProps) => {
    function handler() {
      switch (type) {
        case 'text':
          return <span>{children}</span>;
        case 'break':
          return (
            <div className={styles.break + ' ' + className}>
              ---{children ? ' ' : ''}
              {children}
              {children ? ' ' : ''}
              {''.padEnd(512, '-')}
            </div>
          );
        case 'space':
          return '';
        case 'error':
          return <span className="dyer-error">{children}</span>;
        case 'success':
          return <span className="dyer-success">{children}</span>;
        default:
          return (
            <span className="dyer-error">
              Ошибка! Несуществующее определение строки!
            </span>
          );
      }
    }
    return <pre className={styles.line}>{handler()}</pre>;
  }
);
