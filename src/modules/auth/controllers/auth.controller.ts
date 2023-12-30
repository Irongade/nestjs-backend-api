import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from '../dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUserDto: RegisterUserDTO) {
    try {
      const result = await this.authService.register(createUserDto);

      return result;
    } catch (err) {
      throw err;
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    try {
      const result = await this.authService.login(loginUserDto);

      // intentionaly adding this
      // just in case we want to use access token in cookies
      // if not the code block below can be un-commented.
      // if ('data' in result && 'access_token' in result.data) {
      //   response.cookie('jwt', result.data.access_token, { httpOnly: true });
      // }

      return result;
    } catch (err) {
      throw err;
    }
  }
}
