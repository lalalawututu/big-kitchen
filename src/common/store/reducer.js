import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  headPicture: require('../../style/img/header/headerpicture.png'),
});

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}