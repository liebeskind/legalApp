export default function (state = null, action) {
  switch (action.type) {
    case 'SET_SELECTED_BENEFIT_VALUE':
      return action.payload;
  }

  return state;
}