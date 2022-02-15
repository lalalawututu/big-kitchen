import { combineReducers } from 'redux-immutable';
import { reducer as mineReducer } from '../component/mine/store';

export default combineReducers({
  mine: mineReducer,
});