export default function tokensReducer(state = {
  access_token: '',
  refresh_token: '',
}, {
  type,
  payload,
}) {
  switch (type) {
    case 'updateTokens':
      return payload;
    default:
      return state;
  }
}
