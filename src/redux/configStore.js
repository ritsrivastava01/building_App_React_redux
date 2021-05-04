import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
  collapsed: true,
});
export default function configStore(initialState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Add react devtools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(
      applyMiddleware(thunk, reduxImmutableStateInvariant(), logger)
    )
  );
}
