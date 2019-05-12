import { UPDATE_TOKENS } from '../actions/tokens-actions';

const initTokens = {
  access_token: '',
  refresh_token: '',
};

export default function tokensReducer(state = initTokens,
  { type, payload }) {
  switch (type) {
    case UPDATE_TOKENS:
      return payload; // TODO: not sure if it's supposed to be payload'.something'
    default:
      return state;
  }
}
