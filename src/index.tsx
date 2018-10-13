import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from 'core/history';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'core/store/InitializeStore';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import App from 'components/App/App';
import 'view/sass/index.scss';

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <Router history={ history }>
        <App />
      </Router>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
