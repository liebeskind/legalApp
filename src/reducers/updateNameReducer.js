export default function (state = null, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return action.payload;
  }

  return state;
}