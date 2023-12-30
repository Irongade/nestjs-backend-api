import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { body, query, params } = req;

      this.logger.log(
        `Request - ${method} ${originalUrl} Body: ${JSON.stringify(
          body,
        )} Query:${JSON.stringify(query)} Params:${JSON.stringify(
          params,
        )} - ${userAgent} ${ip}`,
      );

      const { statusCode } = res;
      const contentLength = res.get('content-length');

      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      this.logger.log(
        `Response - ${method} ${originalUrl} ${statusCode} ${responseTime}ms ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
