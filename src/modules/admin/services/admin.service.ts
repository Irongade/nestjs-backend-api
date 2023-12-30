import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorData, ResponseData } from 'src/common/types/error.type';
import { Role } from 'src/common/enums';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async deleteUser(
    id: string,
    authenticatedUser,
  ): Promise<ResponseData<any> | ErrorData> {
    // investigate
    // only users can be deleted
    const user = await this.userRepository.findOne({
      where: { id: id, role: Role.USER },
    });

    // if user does not exist return 404
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // if the same person attempts to delete themselves, throw an error
    if (user.email === authenticatedUser.email) {
      throw new ForbiddenException('User cannot delete themselves');
    }

    await this.userRepository.delete({
      id: id,
    });

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
