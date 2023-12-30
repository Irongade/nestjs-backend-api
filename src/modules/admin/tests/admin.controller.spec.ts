import { Test, TestingModule } from '@nestjs/testing';
import {
  TestAdminUpdateUserPayload,
  TestDeleteUserResponse,
  TestAdminUpdateUser,
} from './constants';
import {
  NotFoundErr,
  TestUserDTO,
  authenticatedUser,
  usersResponse,
} from 'src/modules/user/tests/constants';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserService } from 'src/modules/user/services/user.service';

describe('AdminController', () => {
  let controller: AdminController;

  const adminAuthService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteUser: jest.fn((testId, _details) => {
      const userInfo = usersResponse.data.find((u) => u.id === testId);

      if (userInfo) {
        return TestDeleteUserResponse;
      } else {
        return NotFoundErr;
      }
    }),
  };

  const mockUserService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserById: jest.fn((testId, _details) => {
      const userInfo = usersResponse.data.find((u) => u.id === testId);

      if (userInfo) {
        return TestAdminUpdateUser;
      } else {
        return NotFoundErr;
      }
    }),
  };

  const rolePipe = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        UserService,
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(AdminService)
      .useValue(adminAuthService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overridePipe(Roles)
      .useValue(rolePipe)
      .compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('update user details by admin executes', async () => {
    expect(
      await controller.updateUserByAdmin(
        TestUserDTO.id,
        TestAdminUpdateUserPayload,
      ),
    ).toEqual(TestAdminUpdateUser);
  });

  it('update user details by admdin fails if non existent id is used', async () => {
    expect(
      await controller.updateUserByAdmin(
        'non-existing-users',
        TestAdminUpdateUserPayload,
      ),
    ).toEqual(NotFoundErr);
  });

  it('delete user by admin executes', async () => {
    expect(
      await controller.deleteUser(TestUserDTO.id, authenticatedUser),
    ).toEqual(TestDeleteUserResponse);
  });
});
