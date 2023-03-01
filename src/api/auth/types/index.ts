export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  userId: string;
  login: string;
};

export enum AuthErrors {
  INVALID_CREDENTIALS = 'Incorrect login credentials',
  UNAUTHORIZED = 'Unauthorized: invalid authentication credentials',
  NO_REFRESH_TOKEN = 'No refreshToken in body',
  REFRESH_EXPIRED = 'Refresh token expired',
  REFRESH_MALFORMED = 'Refresh token malformed',
}
