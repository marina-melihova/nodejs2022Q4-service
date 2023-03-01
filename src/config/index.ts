import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: +process.env.PORT,
  logLevel: +process.env.LOG_LEVEL,
  logFileSize: +process.env.LOG_FILE_SIZE_KB,
  salt: +process.env.CRYPT_SALT,
  secret: process.env.JWT_SECRET_KEY,
  secretRefresh: process.env.JWT_SECRET_REFRESH_KEY,
  tokenExpiresIn: process.env.TOKEN_EXPIRE_TIME,
  refreshTokenExp: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};
