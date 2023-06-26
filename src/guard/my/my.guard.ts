import { CanActivate, ExecutionContext, Injectable, Body } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('MyGuard');
    return true;
  }
}
