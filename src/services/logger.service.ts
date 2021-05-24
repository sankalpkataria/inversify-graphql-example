import { injectable } from 'inversify';
import { createLogger, format, transports } from 'winston';
import { constants } from '@/config/constants';

const { LOG_LEVELS } = constants;

@injectable()
export class LoggerService {
  private readonly logger;

  constructor() {
    this.logger = this.createLoggerInstance();
  }

  private createLoggerInstance() {
    return createLogger({
      level: LOG_LEVELS.DEBUG,
      format: format.json(),
      transports: [
        new transports.Console({
          format: format.simple(),
          level: LOG_LEVELS.INFO
        })
      ]
    });
  }

  log(logLevel: string, message: string, extraInfo: any): void {
    this.logger.log(logLevel, message, extraInfo);
  }
}

export interface ILoggerService {
  log(logLevel: string, message: string, extraInfo: any): void;
}