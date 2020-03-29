import { Injectable, NestMiddleware } from'@nestjs/common';
import { Request, Response } from'express';
import { Logger } from'../utils/log4js';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () =>void) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}