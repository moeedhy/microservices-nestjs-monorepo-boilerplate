import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { TokenPayloadInterface } from '@app/common/interfaces';
import { UserRoles } from '@app/common/enums';

Injectable();
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const user: TokenPayloadInterface = context
      .switchToHttp()
      .getRequest().user;

    return requiredRoles.some((role: UserRoles) => user.roles?.includes(role));
  }
}
