export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_SUPERFOOD_TYPE':
      return action.payload;
  }

  return state;
}