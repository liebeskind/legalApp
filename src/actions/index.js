import _ from 'lodash';
import Firebase from 'firebase';

const FETCH_COMPANIES = 'FETCH_COMPANIES';

const SET_SELECTED_BENEFIT_VALUE = 'SET_SELECTED_BENEFIT_VALUE';
const GET_SELECTED_DESCRIPTION = 'GET_SELECTED_DESCRIPTION';
const SET_SELECTED_DESCRIPTION = 'SET_SELECTED_DESCRIPTION';

var config = {
    apiKey: "key",
    authDomain: "authDomain",
    databaseURL: "database",
    storageBucket: "storage",
    // messagingSenderId: "164065335476"
  };
Firebase.initializeApp(config);

export function fetchCompanies() {
  const ref = Firebase.database().ref('Companies')

  return (dispatch) => {
    ref.once('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: FETCH_COMPANIES,
          payload: snapshot.val()
        });
      } else {
        dispatch({
          type: FETCH_COMPANIES,
          payload: null
        });
      }
    });
  };
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
  }
}

export function setSelectedBenefitValue(foodKey, benefitValue) {
  var toUpdate = {};
  toUpdate[foodKey] = benefitValue;

  return (dispatch) => {
    const ref = Firebase.database().ref('BenefitValues').update(toUpdate, function(err) {
      if (err) {
        console.log(err)
        dispatch({
          type: SET_SELECTED_BENEFIT_VALUE,
          payload: null
        })
      } else {
        dispatch({
          type: SET_SELECTED_BENEFIT_VALUE,
          payload: ref
        })
      }
    })
  }
}