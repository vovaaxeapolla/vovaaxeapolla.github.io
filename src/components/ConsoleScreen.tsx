import { observer } from 'mobx-react-lite';
import { memo } from 'react';

import { Line } from '@components';
import LineData from '@console/Line/LineData';

export const ConsoleScreen = memo(
  observer(({ lines }: { lines: LineData[] }) => {
    return (
      <div className="console__screen">
        {Array.isArray(lines) &&
          lines.map((line, index) => {
            if (line !== undefined) {
              return (
                <Line type={line.type} key={index} {...line.props as object}>
                  {line.children}
                </Line>
              );
            }

            return null;
          })}
      </div>
    );
  })
);
