import { combineReducers } from 'redux-immutable';
import { reducer as mineReducer } from '../component/mine/store';
import { reducer as headerReducer } from '../common/store';

export default combineReducers({
  header: headerReducer,
  mine: mineReducer,
});