export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_SUPERFOOD_NAMES':
      return action.payload;
  }

  return state;
}