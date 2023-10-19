import type pino from 'pino';
import type winston from 'winston';
import type { ECS } from './ECS';

/**
 * type-safe logger with ECS fields and optional extra fields
 * supports winston and pino
 *
 * @example
 * // winston
 * new ECSLogger(winstonLogger);
 * // winston with extra fields
 * new ECSLogger<{ foo: "bar" }, winston.Logger>(winstonLogger);
 *
 * @example
 * // pino
 * new ECSLogger(pinoLogger);
 * // pino with extra fields
 * new ECSLogger<{ foo: "bar" }, pino.Logger>(pinoLogger);
 *
 */
export class ECSLogger<
  ExtraFields = {},
  T extends winston.Logger | pino.Logger = winston.Logger | pino.Logger
> {
  private logger: T;

  constructor(logger: T) {
    this.logger = logger;
  }

  private log(
    method: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    ecsFields?: ECS & ExtraFields
  ) {
    // customLevels is unique to pino
    if ((this.logger as pino.Logger).customLevels) {
      this.logger[method](ecsFields, message); // pino requires message to go second
    } else {
      this.logger[method](message, ecsFields);
    }
  }

  public debug(message: string, ecsFields?: ECS & ExtraFields) {
    this.log('debug', message, ecsFields);
  }

  public info(message: string, ecsFields?: ECS & ExtraFields) {
    this.log('info', message, ecsFields);
  }

  public warn(message: string, ecsFields?: ECS & ExtraFields) {
    this.log('warn', message, ecsFields);
  }

  public error(message: string, ecsFields?: ECS & ExtraFields) {
    this.log('error', message, ecsFields);
  }

  public getBaseLogger(): T {
    return this.logger;
  }
}

export default ECSLogger;
