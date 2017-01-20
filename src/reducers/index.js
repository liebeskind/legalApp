import { combineReducers } from 'redux';
import CampaignInfoReducer from './posts_reducer';
import RecordingStatusReducer from './recording_status_reducer';
import AudioOnlyReducer from './audio_only_reducer';

const rootReducer = combineReducers({
	campaignInfo: CampaignInfoReducer,
	recordingStatus: RecordingStatusReducer,
	audioOnly: AudioOnlyReducer
});

export default rootReducer;