export default function (state = false, action) {
  switch (action.type) {
    case 'AUDIO_ONLY_CHANGED':
      return action.payload;
  }

  return state;
}