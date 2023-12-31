import { IsDefined } from 'class-validator';
import { UserGetDTO } from 'src/modules/user/dto/user_get.dto';

export class LoginSuccessDTO {
  @IsDefined()
  user: UserGetDTO;

  @IsDefined()
  access_token: string;

  constructor(user, access_token) {
    this.user = user;
    this.access_token = access_token;
  }
}
