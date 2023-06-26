import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.timestamp = new Date();
    console.log(req.method, req.path);
    next();
    // const { keyword } = req.query;
    // if (keyword) {
    //   next();
    // }else{
    //   throw new BadRequestException('Please input keyword')
    // }
  }
}
