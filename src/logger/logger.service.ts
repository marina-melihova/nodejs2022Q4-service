import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { resolve } from 'path';

const logDir = resolve(process.env.LOG_DIR);
const logFileSize = +process.env.LOG_FILE_SIZE_KB;

const allLogLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];
const configuredLogLevel = +process.env.LOG_LEVEL;
const logLevels = allLogLevels.slice(0, configuredLogLevel);

// const logFileName = `log_${Date.now()}.txt`;

@Injectable()
export class LoggerService extends ConsoleLogger {
  private messageQueue = [];

  constructor() {
    super('App', { logLevels });
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message);
  }

  warn(message: any, context?: string): void {
    super.warn(message, context);
  }

  log(message: any, context?: string): void {
    super.log(message, context);
  }

  verbose(message: any, context?: string): void {
    super.verbose(message, context);
  }

  debug(message: any, context?: string): void {
    super.warn(message, context);
  }
}
