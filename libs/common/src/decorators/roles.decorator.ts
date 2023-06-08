import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@app/common/enums';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
