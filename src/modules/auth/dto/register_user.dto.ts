import { IsDefined, IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/common/enums';

export class RegisterUserDTO {
  @IsDefined({ message: 'Name must be defined' })
  name: string;

  @IsDefined({ message: 'Email must be defined' })
  @IsEmail()
  email: string;

  @IsOptional()
  role: Role;

  @IsDefined({ message: 'Password must be defined' })
  password: string;

  @IsDefined({ message: 'Confirm Password must be defined' })
  confirm_password: string;

  constructor(name, email, password, confirm_password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}
