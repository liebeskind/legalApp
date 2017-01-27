export default function (state = '', action) {
  switch (action.type) {
    case 'GET_SELECTED_DESCRIPTION':
      return action.payload;
  }

  return state;
}