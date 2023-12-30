import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { hashWord, compareHash } from '../../../common/helpers';
import { v4 as uuidv4 } from 'uuid';
import { Role } from 'src/common/enums';
import { LoginUserDTO, RegisterUserDTO } from '../dtos';
import { ErrorData, ResponseData } from 'src/common/types/error.type';
import { UserGetDTO } from 'src/modules/user/dtos/user_get.dto';
import { LoginSuccessDTO } from '../dtos/login_success.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    userDetails: RegisterUserDTO,
  ): Promise<ResponseData<UserGetDTO> | ErrorData> {
    const userExists = await this.userRepository.exist({
      where: { email: userDetails.email },
    });

    if (userExists) {
      throw new ForbiddenException('User with this email already exists');
    }

    const password = await hashWord(userDetails.password);
    const id = uuidv4();
    // process accesstoken

    const createdUser = this.userRepository.create({
      ...userDetails,
      password,
      role: Role.USER,
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
  ): Promise<ResponseData<LoginSuccessDTO> | ErrorData> {
    // verify if user exists
    const user = await this.userRepository.findOne({
      where: { email: loginDetails.email },
      select: this.getCols(),
    });

    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }

    // verify if passwords match
    const doesPasswordMatch = await compareHash(
      loginDetails.password,
      user.password,
    );

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

  generateAccessToken(payload: any, options?: any): string {
    return this.jwtService.sign(payload, options);
  }

  // possibly make this generic
  getCols(): any {
    return this.userRepository.metadata.columns.map((col) => col.propertyName);
  }
}
