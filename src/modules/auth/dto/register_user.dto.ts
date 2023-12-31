import { IsDefined, IsEmail } from 'class-validator';

export class RegisterUserDTO {
  @IsDefined()
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;

  @IsDefined()
  confirm_password: string;

  constructor(name, email, password, confirm_password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}
