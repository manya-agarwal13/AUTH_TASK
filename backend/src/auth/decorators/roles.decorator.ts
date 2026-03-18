import { SetMetadata } from '@nestjs/common';

// Key used to store roles metadata
export const ROLES_KEY = 'roles';

// Custom decorator → @Roles('CLIENT')
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);