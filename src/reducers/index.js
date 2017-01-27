import { combineReducers } from 'redux';
import SuperfoodNamesReducer from './superfoodNames_reducer';
import SuperfoodTypeReducer from './superfoodType_reducer';
import TypeOptionsReducer from './typeOptions_reducer';
import SelectedFoodTypeReducer from './selectedFoodType_reducer';

const rootReducer = combineReducers({
	superfoodNames: SuperfoodNamesReducer,
	superfoodType: SuperfoodTypeReducer,
	typeOptions: TypeOptionsReducer,
	selectedFoodType: SelectedFoodTypeReducer,
});

export default rootReducer;