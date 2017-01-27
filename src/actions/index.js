import _ from 'lodash';
import Firebase from 'firebase';

const FETCH_SUPERFOOD_NAMES = 'FETCH_SUPERFOOD_NAMES';
const FETCH_SUPERFOOD_TYPE = 'FETCH_SUPERFOOD_TYPE';
const FETCH_TYPE_OPTIONS = 'FETCH_TYPE_OPTIONS';

const GET_SELECTED_FOOD_TYPE = 'GET_SELECTED_FOOD_TYPE';
const SET_SELECTED_FOOD_TYPE = 'SET_SELECTED_FOOD_TYPE';
const GET_SELECTED_DESCRIPTION = 'GET_SELECTED_DESCRIPTION';
const SET_SELECTED_DESCRIPTION = 'SET_SELECTED_DESCRIPTION';
const GET_SELECTED_FUN_FACTS = 'GET_SELECTED_FUN_FACTS';
const SET_SELECTED_FUN_FACTS = 'SET_SELECTED_FUN_FACTS';
const GET_SELECTED_SIDE_EFFECTS = 'GET_SELECTED_SIDE_EFFECTS';
const SET_SELECTED_SIDE_EFFECTS = 'SET_SELECTED_SIDE_EFFECTS';

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

  return (dispatch) => {
    const ref = Firebase.database().ref('SuperfoodType').update(toUpdate, function(err) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SELECTED_FOOD_TYPE,
          payload: null
        })
      } else {
        dispatch({
          type: SET_SELECTED_FOOD_TYPE,
          payload: ref
        })
      }
    })
  }
}

export function getSelectedDescription(foodKey) {
  return (dispatch) => {
    const ref = Firebase.database().ref('Descriptions').child(foodKey).on('value', function(snapshot) {
      if (!snapshot) {
        dispatch({
          type: GET_SELECTED_DESCRIPTION,
          payload: null
        })
      } else {
        dispatch({
          type: GET_SELECTED_DESCRIPTION,
          payload: snapshot.val()
        })
      }
    })
  }
}

export function setSelectedDescription(foodKey, description) {
  var toUpdate = {};
  toUpdate[foodKey] = description;

  return (dispatch) => {
    const ref = Firebase.database().ref('Descriptions').update(toUpdate, function(err) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SELECTED_DESCRIPTION,
          payload: null
        })
      } else {
        dispatch({
          type: SET_SELECTED_DESCRIPTION,
          payload: ref
        })
      }
    })
  }
}

export function getSelectedFunFacts(foodKey) {
  return (dispatch) => {
    const ref = Firebase.database().ref('FunFacts').child(foodKey).on('value', function(snapshot) {
      if (!snapshot) {
        dispatch({
          type: GET_SELECTED_FUN_FACTS,
          payload: null
        })
      } else {
        dispatch({
          type: GET_SELECTED_FUN_FACTS,
          payload: snapshot.val()
        })
      }
    })
  }
}

export function setSelectedFunFacts(foodKey, funFacts) {
  var toUpdate = {};
  toUpdate[foodKey] = funFacts;

  return (dispatch) => {
    const ref = Firebase.database().ref('FunFacts').update(toUpdate, function(err) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SELECTED_FUN_FACTS,
          payload: null
        })
      } else {
        dispatch({
          type: SET_SELECTED_FUN_FACTS,
          payload: ref
        })
      }
    })
  }
}

export function getSelectedSideEffects(foodKey) {
  return (dispatch) => {
    const ref = Firebase.database().ref('SideEffects').child(foodKey).on('value', function(snapshot) {
      if (!snapshot) {
        dispatch({
          type: GET_SELECTED_SIDE_EFFECTS,
          payload: null
        })
      } else {
        dispatch({
          type: GET_SELECTED_SIDE_EFFECTS,
          payload: snapshot.val()
        })
      }
    })
  }
}

export function setSelectedSideEffects(foodKey, sideEffects) {
  var toUpdate = {};
  toUpdate[foodKey] = sideEffects;

  return (dispatch) => {
    const ref = Firebase.database().ref('SideEffects').update(toUpdate, function(err) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SELECTED_SIDE_EFFECTS,
          payload: null
        })
      } else {
        dispatch({
          type: SET_SELECTED_SIDE_EFFECTS,
          payload: ref
        })
      }
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