import { IsDefined, IsUUID, IsEmail, MaxLength } from 'class-validator';
import { Role } from '../../../common/enums';

export class UserGetDTO {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @MaxLength(100)
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  role: Role;

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}
