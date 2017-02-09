import { combineReducers } from 'redux';
import UpdateNameReducer from './updateNameReducer';

const rootReducer = combineReducers({
  updatedName: UpdateNameReducer
});

export default rootReducer;