export default function (state = '', action) {
  switch (action.type) {
    case 'GET_SELECTED_FUN_FACTS':
      return action.payload;
  }

  return state;
}