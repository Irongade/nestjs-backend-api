import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserGetDTO } from '../dto/user_get.dto';
import {
  ResponseData,
  ResponseWithoutData,
} from 'src/common/types/response.type';
import { UpdateUserDTO } from '../dto/update_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async fetchUsers(): Promise<ResponseData<UserGetDTO> | HttpException> {
    try {
      // fetch all users
      const users = await this.userRepository.find();

      return {
        success: true,
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async fetchUser(
    email: string,
  ): Promise<ResponseData<UserGetDTO> | HttpException> {
    // find user
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    // if no user exists, return an error.
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { success: true, message: 'User fetched successfully', data: user };
  }

  async updateUserById(
    id: string,
    details: UpdateUserDTO,
  ): Promise<ResponseWithoutData | HttpException> {
    // find user
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    // if no user exists, return an error.
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // update user
    await this.userRepository.update({ id }, { ...details });

    return { success: true, message: 'User updated successfully' };
  }
}
