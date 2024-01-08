import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';

import { Win } from '@components';
import { IWin } from '@src/stores/WinsStore';

const winsRoot = document.querySelector('#wins-root');

export const Wins = observer(({ wins }: { wins: IWin[] }) => {
  return (
    <>
      {
        wins.map((w) => createPortal(
          <Win
            key={w.id}
            close={w.close}
            title={w.title}
            element={w.element}
            type={w.type} />,
          winsRoot
        ))
      }
    </>
  );
});
