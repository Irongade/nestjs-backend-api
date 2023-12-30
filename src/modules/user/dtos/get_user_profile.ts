import { IsDefined, IsEmail } from 'class-validator';

export class GetUserProfileDTO {
  @IsDefined()
  @IsEmail()
  email: string;

  constructor(email) {
    this.email = email;
  }
}
