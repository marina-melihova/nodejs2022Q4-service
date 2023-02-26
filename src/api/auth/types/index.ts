export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  userId: string;
  login: string;
};
