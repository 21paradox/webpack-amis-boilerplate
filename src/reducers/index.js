import { combineReducers } from 'redux';
import common from './common';
import * as constant from '../constants';

const initLeft = {
  asideFolded: false,
  offScreen: false,
  userDropDownShow: false,
};

const leftAside = (state = initLeft, action) => {
  if (action.type === constant.UPDATE_ASIDE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

export default combineReducers({
  leftAside,
  common,
});
