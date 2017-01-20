import _ from 'lodash';
import Firebase from 'firebase';

const FETCH_CAMPAIGN_INFO = 'FETCH_CAMPAIGN_INFO';
const RECORDING_STATUS_CHANGED = 'RECORDING_STATUS_CHANGED';
const AUDIO_ONLY_CHANGED = 'AUDIO_ONLY_CHANGED';

const config = {
  apiKey: "",
  databaseURL: ""
}
Firebase.initializeApp(config);

export function fetchCompanyCampaignInfo(companyName) {
  const ref = Firebase.database().ref('companyCampaigns').child(companyName);

  return (dispatch) => {
    ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: FETCH_CAMPAIGN_INFO,
          payload: snapshot.val()
        });
      } else {
        dispatch({
          type: FETCH_CAMPAIGN_INFO,
          payload: null
        });
      }
    });
  };
}

export function recordingStatusChanged(recordStatus) {
  return dispatch => {
    dispatch({
      type: RECORDING_STATUS_CHANGED,
      payload: recordStatus
    })
  }
}

export function audioOnlyChanged(audioOnlyBool) {
  return dispatch => {
    dispatch({
      type: AUDIO_ONLY_CHANGED,
      payload: audioOnlyBool
    })
  }
}

// export function fetchDraftList() {
//   var ref = Firebase.database().ref('draftList');

//   return dispatch => {
//     ref.on('value', snapshot => {
//       if (snapshot.val) {
//         dispatch({
//           type: FETCH_DRAFT_LIST,
//           payload: snapshot
//         });
//       } else {
//         dispatch({
//           type: FETCH_DRAFT_LIST,
//           payload: null
//         });
//       }
//     });
//   };
// }

// export function fetchDraftedList() {
//   var ref = Firebase.database().ref('draftedList');

//   return dispatch => {
//     ref.on('value', snapshot => {
//       if (snapshot.val()) {
//         dispatch({
//           type: FETCH_DRAFTED_LIST,
//           payload: snapshot
//         });
//       } else {
//         dispatch({
//           type: FETCH_DRAFTED_LIST,
//           payload: null
//         });
//       }
//     });
//   };
// }

// export function draftPlayer (player, count, admin) {
//   if (!admin) {
//     return dispatch => {};
//   }
//   var ref = Firebase.database().ref('draftList/' + count);
//   var ref2 = Firebase.database().ref('draftedList/' + player.playerID);

//   return dispatch => {
//     ref.update(player);
//     ref2.update(player);
//   }
// }

// export function unDraftPlayer (player, item) {
//   var ref = Firebase.database().ref('draftList/' + item);
//   var ref2 = Firebase.database().ref('draftedList/' + player.playerID);

//   return dispatch => {
//     ref.remove();
//     ref2.remove();
//   }
// }