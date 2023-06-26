import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUsername = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToRpc().getContext().req;
    return req.user.username;
  },
);
