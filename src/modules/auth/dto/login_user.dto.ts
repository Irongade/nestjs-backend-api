import { IsDefined, IsEmail } from 'class-validator';

export class LoginUserDTO {
  @IsDefined({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @IsDefined({ message: 'Password cannot be empty' })
  password: string;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
