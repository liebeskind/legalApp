import { combineReducers } from 'redux';
import SelectedBenefitValueReducer from './selectedBenefitValue_reducer';

const rootReducer = combineReducers({
  selectedBenefitValue: SelectedBenefitValueReducer
});

export default rootReducer;