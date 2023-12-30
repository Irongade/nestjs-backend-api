import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserGetDTO } from '../dtos/user_get.dto';
import { ErrorData, ResponseData } from 'src/common/types/error.type';
import { UpdateUserDTO } from '../dtos/update_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async fetchUsers() {
    try {
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
  ): Promise<ResponseData<UserGetDTO> | ErrorData> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { success: true, message: 'User fetched successfully', data: user };
  }

  async updateUserById(id: string, details: UpdateUserDTO) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, { ...details });
    return { success: true, message: 'User updated successfully' };
  }
}
