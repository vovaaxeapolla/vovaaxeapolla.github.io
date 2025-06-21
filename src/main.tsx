import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@src/App';
import '@src/assets/styles/main.sass';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
