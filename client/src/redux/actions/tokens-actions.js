export const UPDATE_TOKENS = 'tokens:updateTokens';

export function updateTokens(accessToken, refreshToken) {
  return {
    type: UPDATE_TOKENS,
    payload: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  };
}
