import winston from "winston";
import type ECS from "./ECS";

export default class EcsLogger<ExtraFields = {}> {
  private logger: winston.Logger;

  constructor(logger: winston.Logger) {
    this.logger = logger;
  }

  public debug(message: string, ecsFields: ECS & ExtraFields) {
    this.logger.debug(message, ecsFields);
  }

  public info(message: string, ecsFields: ECS & ExtraFields) {
    this.logger.info(message, ecsFields);
  }

  public warn(message: string, ecsFields: ECS & ExtraFields) {
    this.logger.warn(message, ecsFields);
  }

  public error(message: string, ecsFields: ECS & ExtraFields) {
    this.logger.error(message, ecsFields);
  }

  public getBaseLogger(): winston.Logger {
    return this.logger;
  }
}
