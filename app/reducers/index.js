// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import translator from './TranslatorReducer';

const rootReducer = combineReducers({
  counter,
  router,
  translator
});

export default rootReducer;
