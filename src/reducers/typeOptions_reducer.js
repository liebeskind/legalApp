export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_TYPE_OPTIONS':
      return action.payload;
  }

  return state;
}