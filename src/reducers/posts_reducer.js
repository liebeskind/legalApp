export default function (state = null, action) {
  switch (action.type) {
    case 'FETCH_CAMPAIGN_INFO':
      return action.payload;
  }

  return state;
}