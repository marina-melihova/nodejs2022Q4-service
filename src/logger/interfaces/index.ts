import { WriteStream } from 'fs';

export interface IFileMap {
  log: string;
  error: string;
}

export interface IStreamMap {
  log: WriteStream;
  error: WriteStream;
}

export interface IQueueMap {
  log: string[];
  error: string[];
}
