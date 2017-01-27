import _ from 'lodash';
import Firebase from 'firebase';

const FETCH_SUPERFOOD_NAMES = 'FETCH_SUPERFOOD_NAMES';
const FETCH_SUPERFOOD_TYPE = 'FETCH_SUPERFOOD_TYPE';
const FETCH_TYPE_OPTIONS = 'FETCH_TYPE_OPTIONS';
const GET_SELECTED_FOOD_TYPE = 'GET_SELECTED_FOOD_TYPE'

// const FETCH_CAMPAIGN_INFO = 'FETCH_CAMPAIGN_INFO';
// const RECORDING_STATUS_CHANGED = 'RECORDING_STATUS_CHANGED';
// const AUDIO_ONLY_CHANGED = 'AUDIO_ONLY_CHANGED';

var config = {
    apiKey: "AIzaSyBNpbvruUr-xr4s06uRmoU8ABNcLllBbMA",
    authDomain: "superfood-d8075.firebaseapp.com",
    databaseURL: "https://superfood-d8075.firebaseio.com",
    storageBucket: "superfood-d8075.appspot.com",
    // messagingSenderId: "164065335476"
  };
Firebase.initializeApp(config);

export function fetchSuperfoodNames() {
  const ref = Firebase.database().ref('SuperfoodName')

  return (dispatch) => {
    ref.once('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: FETCH_SUPERFOOD_NAMES,
          payload: snapshot.val()
        });
      } else {
        dispatch({
          type: FETCH_SUPERFOOD_NAMES,
          payload: null
        });
      }
    });
  };
}

export function fetchSuperfoodType() {
  const ref = Firebase.database().ref('SuperfoodType')

  return (dispatch) => {
    ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: FETCH_SUPERFOOD_TYPE,
          payload: snapshot.val()
        });
      } else {
        dispatch({
          type: FETCH_SUPERFOOD_TYPE,
          payload: null
        });
      }
    });
  };
}

export function fetchTypeOptions() {
  const ref = Firebase.database().ref('TypeOptions')

  return (dispatch) => {
    ref.once('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: FETCH_TYPE_OPTIONS,
          payload: snapshot.val()
        });
      } else {
        dispatch({
          type: FETCH_TYPE_OPTIONS,
          payload: null
        });
      }
    });
  };
}

export function setSelectedFoodType(foodKey, foodType) {
  var toUpdate = {};
  toUpdate[foodKey] = foodType;
  const ref = Firebase.database().ref('SuperfoodType').update(toUpdate, function(err) {
    if (err) return console.log(err)
      return console.log("Successfully updated food type for " +foodKey)
  })
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