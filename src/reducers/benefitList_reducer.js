export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_BENEFIT_LIST':
      return action.payload;
  }

  return state;
}