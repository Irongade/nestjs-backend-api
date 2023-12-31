import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
// returns the list of Roles as an array of roles.
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
