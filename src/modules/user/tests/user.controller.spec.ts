import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import {
  BadReqError,
  NotFoundErr,
  authenticatedUser,
  unauthenticatedUser,
  updatedUserId,
  updatedUserPayload,
  updatedUserResponse,
  userResponse,
  usersResponse,
} from './constants';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    fetchUsers: jest.fn(() => {
      return usersResponse;
    }),
    fetchUser: jest.fn((email) => {
      const userInfo = usersResponse.data.find((u) => u.email === email);

      if (userInfo) {
        return userResponse;
      } else {
        return BadReqError;
      }
    }),
    updateUserById: jest.fn((testId, details) => {
      const userInfo = usersResponse.data.find((u) => u.id === testId);

      if (userInfo && 'name' in details) {
        return updatedUserResponse;
      } else {
        return NotFoundErr;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, JwtAuthGuard],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get users', async () => {
    expect(await controller.getUsers()).toEqual(usersResponse);
  });

  it('geting user with correct email should return user object', async () => {
    expect(await controller.getUser(authenticatedUser)).toEqual(userResponse);

    expect(mockUserService.fetchUser).toHaveBeenCalledWith(
      authenticatedUser.email,
    );
  });

  it('geting user with incorrect email should return error', async () => {
    expect(await controller.getUser(unauthenticatedUser)).toEqual(BadReqError);

    expect(mockUserService.fetchUser).toHaveBeenCalledWith(
      unauthenticatedUser.email,
    );
  });

  it('updating user successful', async () => {
    expect(
      await controller.updateUser(updatedUserId, updatedUserPayload),
    ).toEqual(updatedUserResponse);
  });

  it('updating user fails due to incorrect id', async () => {
    expect(
      await controller.updateUser('incorrectId', updatedUserPayload),
    ).toEqual(NotFoundErr);
  });
});
