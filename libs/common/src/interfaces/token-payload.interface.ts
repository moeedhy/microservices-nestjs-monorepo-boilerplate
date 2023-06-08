import { UserRoles } from '@app/common/enums';

export interface TokenPayloadInterface {
  id: string;
  roles: UserRoles[];
}
