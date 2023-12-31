import {
  Controller,
  Get,
  Put,
  Body,
  HttpCode,
  UseGuards,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UpdateUserDTO } from '../dto/update_user.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers() {
    try {
      const result = await this.userService.fetchUsers();
      return result;
    } catch (err) {
      throw err;
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@AuthUser() user) {
    try {
      const result = await this.userService.fetchUser(user.email);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() userDetails: UpdateUserDTO,
  ) {
    try {
      const result = await this.userService.updateUserById(id, userDetails);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
