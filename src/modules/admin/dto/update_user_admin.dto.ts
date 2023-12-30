import { IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/common/enums';

export class UpdateUserAdminDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  role: Role;

  @IsOptional()
  @IsEmail()
  email: string;
}
