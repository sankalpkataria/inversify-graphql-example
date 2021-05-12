import { Services } from '../config/services';
import { inject, injectable } from 'inversify';
import { constants } from '../config/constants';
import { ILoggerService } from './logger.service';

const { LOG_LEVELS, ERRORS } = constants;

class AppError extends Error {
  type: string;
  message: string;
  code: number;
  level: string;
  stackTrace: string;
  isOperational: boolean;
  time: Date;
  constructor(level: string, type: string, message: string, code: number, isOperational: boolean) {
    super(message);
    this.type = type;
    this.message = message;
    // status code to throw(if any).
    this.code = code;
    this.level = level;
    // true, when our app throws an error intentionally, e.g.: Missing some input
    this.isOperational = isOperational;
    this.time = new Date();
    this.stackTrace = this.stack || '';
  }
}

@injectable()
export class ErrorService {
  constructor(
    @inject(Services.LoggerService) 
    private readonly logger: ILoggerService,
  ) {}

  throwUnAuthenticatedError(message: string, isOperational = true): AppError {
    this.logger.log(LOG_LEVELS.ERROR, message, {
      type: ERRORS.UNAUTHENTICATED.TYPE,
      code: ERRORS.UNAUTHENTICATED.CODE,
      time: new Date(),
      isOperational
    });
    throw new AppError(LOG_LEVELS.ERROR, ERRORS.UNAUTHENTICATED.TYPE, message, ERRORS.UNAUTHENTICATED.CODE, isOperational);
  };

  throwBadRequestError(message: string, isOperational = true): AppError {
    this.logger.log(LOG_LEVELS.ERROR, message, {
      type: ERRORS.BAD_REQUEST.TYPE,
      code: ERRORS.BAD_REQUEST.CODE,
      time: new Date(),
      isOperational
    });
    throw new AppError(LOG_LEVELS.ERROR, ERRORS.BAD_REQUEST.TYPE, message, ERRORS.BAD_REQUEST.CODE, isOperational);
  };

  throwNotFoundError(message: string, isOperational = true): AppError {
    this.logger.log(LOG_LEVELS.ERROR, message, {
      type: ERRORS.NOT_FOUND.TYPE,
      code: ERRORS.NOT_FOUND.CODE,
      time: new Date(),
      isOperational
    });
    throw new AppError(LOG_LEVELS.ERROR, ERRORS.NOT_FOUND.TYPE, message, ERRORS.NOT_FOUND.CODE, isOperational);
  };

  throwUnAuthorizedError(message: string, isOperational = true): AppError {
    this.logger.log(LOG_LEVELS.ERROR, message, {
      type: ERRORS.UNAUTHORIZED.TYPE,
      code: ERRORS.UNAUTHORIZED.CODE,
      time: new Date(),
      isOperational
    });
    throw new AppError(LOG_LEVELS.ERROR, ERRORS.UNAUTHORIZED.TYPE, message, ERRORS.UNAUTHORIZED.CODE, isOperational);
  };

  throwInternalServerError(message: string, isOperational = true): AppError {
    this.logger.log(LOG_LEVELS.ERROR, message, {
      type: ERRORS.INTERNAL_SERVER_ERROR.TYPE,
      code: ERRORS.INTERNAL_SERVER_ERROR.CODE,
      time: new Date(),
      isOperational
    });
    throw new AppError(LOG_LEVELS.ERROR, ERRORS.INTERNAL_SERVER_ERROR.TYPE, message, ERRORS.INTERNAL_SERVER_ERROR.CODE, isOperational);
  };
}

export interface IErrorService {
  throwUnAuthenticatedError(message: string, isOperational?: boolean): AppError;
  throwBadRequestError(message: string, isOperational?: boolean): AppError;
  throwNotFoundError(message: string, isOperational?: boolean): AppError;
  throwUnAuthorizedError(message: string, isOperational?: boolean): AppError;
  throwInternalServerError(message: string, isOperational?: boolean): AppError;
}