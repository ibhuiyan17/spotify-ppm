export default function startButtonReducer(state = '', {
  type,
  payload,
}) {
  switch (type) {
    case 'buttonClicked':
      return payload;
    default:
  }
  return state;
}
