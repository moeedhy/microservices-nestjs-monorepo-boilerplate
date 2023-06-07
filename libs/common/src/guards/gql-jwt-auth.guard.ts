import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx);
    return context.getContext().req;
  }
}
