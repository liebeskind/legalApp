export default function (state = '', action) {
  switch (action.type) {
    case 'GET_SELECTED_SIDE_EFFECTS':
      return action.payload;
  }

  return state;
}