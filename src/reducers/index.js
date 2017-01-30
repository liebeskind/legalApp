import { combineReducers } from 'redux';
import SuperfoodNamesReducer from './superfoodNames_reducer';
import SuperfoodTypeReducer from './superfoodType_reducer';
import TypeOptionsReducer from './typeOptions_reducer';
import BenefitListReducer from './benefitList_reducer';
import SelectedFoodTypeReducer from './selectedFoodType_reducer';
import SelectedDescriptionReducer from './selectedDescription_reducer';
import SelectedFunFactsReducer from './selectedFunFacts_reducer';
import SelectedSideEffectsReducer from './selectedSideEffects_reducer';

const rootReducer = combineReducers({
	superfoodNames: SuperfoodNamesReducer,
	superfoodType: SuperfoodTypeReducer,
	typeOptions: TypeOptionsReducer,
	selectedFoodType: SelectedFoodTypeReducer,
	selectedDescription: SelectedDescriptionReducer,
	selectedFunFacts: SelectedFunFactsReducer,
	selectedSideEffects: SelectedSideEffectsReducer,
	benefitList: BenefitListReducer,
});

export default rootReducer;