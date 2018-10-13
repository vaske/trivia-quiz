import { applyMiddleware, createStore, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootEpic } from 'core/epics';
import reducer from 'core/store/quiz/reducers/quiz';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);
// const storeMiddleware = applyMiddleware(epicMiddleware, logger);
const storeMiddleware = applyMiddleware(epicMiddleware, thunk, logger);
// const storeMiddleware = applyMiddleware(epicMiddleware);

export const store = createStore(
    persistedReducer,
    composeEnhancers(storeMiddleware)
);

export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export default { store, persistor };
