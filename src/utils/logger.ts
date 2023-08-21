import { LoggerService } from '@nestjs/common';
import path from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs';

export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: string, ...optionalParams: any[]) {
    if (loggerX.getLoggerLevel() < 3) return;
    const text = message + optionalParams.toString();
    loggerX.checkFileSize(text.length);
    loggerX.log(text);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: string, ...optionalParams: any[]) {
    if (loggerX.getLoggerLevel() < 1) return;
    const text = message + optionalParams.toString();
    loggerX.checkErrorFileSize(text.length);
    loggerX.errLog(text);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string, ...optionalParams: any[]) {
    if (loggerX.getLoggerLevel() < 2) return;
    const text = message + optionalParams.toString();
    loggerX.checkFileSize(text.length);
    loggerX.log(text);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: string, ...optionalParams: any[]) {
    if (loggerX.getLoggerLevel() < 3) return;
    const text = message + optionalParams.toString();
    loggerX.checkFileSize(text.length);
    loggerX.log(text);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: string, ...optionalParams: any[]) {
    if (loggerX.getLoggerLevel() < 3) return;
    const text = message + optionalParams.toString();
    loggerX.checkFileSize(text.length);
    loggerX.log(text);
  }
}

export class LoggerBasement {
  private readonly logger = new MyLogger();
  private loggerLevel: number = Number(process.env.LOG_LEVEL || '3');
  private maxFileSize: number = Number(process.env.MAX_FILE_SIZE || '65536');
  private logFileN: number = 0;
  private logErrorFileN: number = 0;
  private logFileStartPrefix: string;

  constructor() {
    if (!this.loggerLevel) this.loggerLevel = 3;
    this.logFileStartPrefix = crypto.randomUUID();
  }

  getLoggerLevel(): number {
    return this.loggerLevel;
  }

  getMaxFileSize(): number {
    return this.maxFileSize;
  }

  pathToLog() {
    return path.join(
      'logs',
      this.logFileStartPrefix,
      String(this.logFileN),
      '.log',
    );
  }

  pathToErrorLog() {
    return path.join(
      'logs',
      this.logFileStartPrefix,
      String(this.logFileN),
      '.err',
    );
  }

  getLogger() {
    return this.logger;
  }

  checkFileSize(size: number) {
    const stats = fs.statSync(this.pathToLog());
    if (stats.size + size >= loggerX.getMaxFileSize()) this.logFileN++;
  }

  checkErrorFileSize(size: number) {
    const stats = fs.statSync(this.pathToErrorLog());
    if (stats.size + size >= loggerX.getMaxFileSize()) this.logErrorFileN++;
  }

  log(message: string) {
    fs.appendFileSync(this.pathToLog(), message + '\n', 'utf8');
  }

  errLog(message: string) {
    fs.appendFileSync(this.pathToErrorLog(), message + '\n', 'utf8');
  }
}

export const loggerX = new LoggerBasement();
