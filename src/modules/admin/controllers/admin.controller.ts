import {
  Controller,
  Body,
  ParseUUIDPipe,
  UseGuards,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { UpdateUserAdminDTO } from '../dto/update_user_admin.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthUser } from 'src/common/decorators/user.decorator';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
  ) {}

  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/update-user-details/:id')
  async updateUserByAdmin(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() userDetails: UpdateUserAdminDTO,
  ) {
    try {
      const result = await this.userService.updateUserById(id, userDetails);

      return result;
    } catch (err) {
      throw err;
    }
  }

  @HttpCode(204)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete-user/:id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @AuthUser() authenticatedUser,
  ) {
    try {
      const result = await this.adminService.deleteUser(id, authenticatedUser);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
