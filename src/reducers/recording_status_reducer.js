export default function (state = 'pre_record', action) {
  switch (action.type) {
    case 'RECORDING_STATUS_CHANGED':
      return action.payload;
  }

  return state;
}