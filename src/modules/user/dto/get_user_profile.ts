import { IsDefined, IsEmail } from 'class-validator';

export class GetUserProfileDTO {
  @IsDefined({ message: 'Email must be defined' })
  @IsEmail()
  email: string;

  constructor(email) {
    this.email = email;
  }
}
