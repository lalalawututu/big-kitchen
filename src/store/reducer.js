import { combineReducers } from 'redux-immutable';
import { reducer as mineReducer } from '../component/mine/store';
import { reducer as headerReducer } from '../common/store';
import { reducer as workMangeReducer } from '../component/workmange/store';

export default combineReducers({
  header: headerReducer,
  mine: mineReducer,
  workMange: workMangeReducer,
});