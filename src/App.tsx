import '@styles/App.sass';
import { observer } from 'mobx-react-lite';

import { Console } from '@components';

export const App = observer(() => {
  return (
    <div className="app">
      <Console />
    </div>
  );
});
