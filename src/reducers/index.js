import { combineReducers } from 'redux';
import SuperfoodNamesReducer from './superfoodNames_reducer';
import SuperfoodTypeReducer from './superfoodType_reducer';

const rootReducer = combineReducers({
	superfoodNames: SuperfoodNamesReducer,
	superfoodType: SuperfoodTypeReducer,
});

export default rootReducer;