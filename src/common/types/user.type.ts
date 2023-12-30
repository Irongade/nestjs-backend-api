import { Role } from '../enums';

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  role: Role;
  id: string;
  access_token: string;
};
