import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'fs';
import { stat } from 'fs/promises';
import { resolve } from 'path';

const logFileSize = +process.env.LOG_FILE_SIZE_KB;
const logDir = resolve('./logs');

const allLogLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];
const configuredLogLevel = +process.env.LOG_LEVEL;
const logLevels = allLogLevels.slice(0, configuredLogLevel);

interface IFileMap {
  log: string;
  error: string;
}

interface IStreamMap {
  log: WriteStream;
  error: WriteStream;
}

interface IQueueMap {
  log: string[];
  error: string[];
}

@Injectable()
export class LoggerService extends ConsoleLogger {
  private fileName: IFileMap;
  private messageQueue: IQueueMap;
  private writeStream: IStreamMap;

  constructor() {
    super('App', { logLevels });
    this.init();
  }

  private createStream(file: string) {
    return createWriteStream(`${logDir}/${file}`, { flags: 'as' });
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    this.messageQueue.error.push(message, stack, context);
  }

  warn(message: any, context?: string): void {
    super.warn(message, context);
    this.messageQueue.log.push(`[${this.getCurrentTime()}]: ${message}`);
  }

  log(message: any, context?: string): void {
    super.log(message, context);
    this.messageQueue.log.push(`[${this.getCurrentTime()}]: ${message}`);
  }

  verbose(message: any, context?: string): void {
    super.verbose(message, context);
    this.messageQueue.log.push(`[${this.getCurrentTime()}]: ${message}`);
  }

  debug(message: any, context?: string): void {
    super.warn(message, context);
    this.messageQueue.log.push(`[${this.getCurrentTime()}]: ${message}`);
  }

  private init() {
    this.fileName = {
      log: `log_${Date.now()}.log`,
      error: `error_${Date.now()}.log`,
    };
    this.messageQueue = { log: [], error: [] };
    this.writeStream = {
      log: this.createStream(this.fileName.log),
      error: this.createStream(this.fileName.error),
    };

    setInterval(async () => this.writeToFile('log'), 100);
    setInterval(async () => this.writeToFile('error'), 500);
  }

  private async writeToFile(logType: string) {
    const fileInfo = await stat(`${logDir}/${this.fileName[logType]}`);
    const isFileFull = fileInfo.size / 1024 >= logFileSize;

    if (isFileFull) {
      this.createNewFile(logType);
    }
    const msg = this.messageQueue[logType].shift();
    if (msg) {
      this.writeStream[logType].write(msg + '\n');
    }
  }

  private createNewFile(logType: string) {
    this.fileName[logType] = `${logType}_${Date.now()}.log`;
    this.writeStream[logType].close();
    this.writeStream[logType] = this.createStream(this.fileName[logType]);
  }

  private getCurrentTime() {
    return new Date().toISOString();
  }
}
