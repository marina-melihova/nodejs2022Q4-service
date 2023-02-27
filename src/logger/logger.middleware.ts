import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private context = 'App';
  private resData: string = '';

  constructor(private logger: LoggerService) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { body: rawBody, method, originalUrl, query } = request;
    const reqBody = await this.getBodyForLog(rawBody);

    this.getResponse(response);

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      if (statusCode >= 500) {
        return;
      }

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} - Request body: ${JSON.stringify(
        reqBody,
        null,
        2,
      )}, query: ${JSON.stringify(query)} - Response data: ${
        this.resData ? JSON.stringify(this.resData, null, 2) : statusMessage
      }`;

      if (statusCode >= 400) {
        return this.logger.warn(message, this.context);
      }

      return this.logger.log(message, this.context);
    });

    next();
  }

  private async encode(word: string) {
    return bcrypt.hash(word.toString(), +process.env.CRYPT_SALT);
  }

  private async getBodyForLog(body: any) {
    const { password, oldPassword, newPassword } = body;
    const newBody = { ...body };
    if (password) {
      newBody.password = await this.encode(password);
    }
    if (oldPassword) {
      newBody.oldPassword = await this.encode(oldPassword);
    }
    if (newPassword) {
      newBody.newPassword = await this.encode(newPassword);
    }
    return newBody;
  }

  private getResponse(res: Response) {
    let send = res.send;
    res.send = (data) => {
      this.resData = data ? JSON.parse(data.toString()) : '';
      res.send = send;
      return res.send(data);
    };
  }
}
