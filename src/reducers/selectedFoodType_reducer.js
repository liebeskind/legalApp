export default function (state = null, action) {
  switch (action.type) {
    case 'GET_SELECTED_FOOD_TYPE':
      return action.payload;
  }

  return state;
}