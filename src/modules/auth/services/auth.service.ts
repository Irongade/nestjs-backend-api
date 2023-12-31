import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { hashWord, compareHash } from '../../../common/helpers';
import { v4 as uuidv4 } from 'uuid';
import { Role } from 'src/common/enums';
import { LoginUserDTO, RegisterUserDTO, LoginSuccessDTO } from '../dto';
import { ResponseData } from 'src/common/types/response.type';
import { UserGetDTO } from 'src/modules/user/dto/user_get.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    userDetails: RegisterUserDTO,
  ): Promise<ResponseData<UserGetDTO> | HttpException> {
    // check if user already exists.
    const doesUserExist = await this.userRepository.exist({
      where: { email: userDetails.email },
    });

    // if user does not exist, throw error
    if (doesUserExist) {
      throw new ForbiddenException('User with this email already exists');
    }

    // if password and confirm password dont match, throw error
    if (userDetails.password !== userDetails.confirm_password) {
      throw new ForbiddenException(
        'Password and Confirm Password must be identical',
      );
    }

    // generate password and user ID
    const password = await hashWord(userDetails.password);
    const id = uuidv4();

    // please note, a conscious decision was made to exlude access tokens from the user data
    // as this is generally bad practice.
    const createdUser = this.userRepository.create({
      ...userDetails,
      password,
      role: !!userDetails?.role ? userDetails.role : Role.USER,
      id,
    });

    const user = await this.userRepository.save(createdUser);

    return {
      success: true,
      message: 'User successfully created',
      data: user,
    };
  }

  async login(
    loginDetails: LoginUserDTO,
  ): Promise<ResponseData<LoginSuccessDTO> | HttpException> {
    // verify if user exists
    const user = await this.userRepository.findOne({
      where: { email: loginDetails.email },
      select: this.getCols(),
    });

    // if user does not exists
    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }

    // verify if passwords match
    const doesPasswordMatch = await compareHash(
      loginDetails.password,
      user.password,
    );

    // if password does not match, throw an error.
    if (!doesPasswordMatch) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const accessToken = this.generateAccessToken(payload);

    const userDto = new UserGetDTO(user);

    return {
      success: true,
      message: 'Login Successfull',
      data: {
        user: userDto,
        access_token: accessToken,
      },
    };
  }

  // this method generates an access token to be used for authentication
  generateAccessToken(payload: any, options?: any): string {
    return this.jwtService.sign(payload, options);
  }

  // possibly make this generic
  // this method helps to generate the list of columns in the model
  // we generally exclude certain fields from select queries like passwords,
  // however, sometimes we want to select all the columns including passwords, so we can check if it is correct.
  // this method helps us to do that.
  getCols(): any {
    return this.userRepository.metadata.columns.map((col) => col.propertyName);
  }
}
