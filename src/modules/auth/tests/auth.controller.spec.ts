import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import {
  TestLoginDTO,
  TestLoginUserResponse,
  TestRegisterDTO,
  TestRegisterUserResponse,
  TestFailingLoginDTO,
  TestFailingRegisterDTO,
} from './constants';
import { BadReqError, NotFoundErr } from 'src/modules/user/tests/constants';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn((details) => {
      if (details.email === 'exists') {
        return BadReqError;
      }

      return TestRegisterUserResponse;
    }),
    login: jest.fn((details) => {
      if (details.email === 'exists') {
        return NotFoundErr;
        // throw new ForbiddenException('Invalid Credentials');
      }

      return TestLoginUserResponse;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register users executes', async () => {
    expect(await controller.register(TestRegisterDTO)).toEqual(
      TestRegisterUserResponse,
    );
  });

  it('geting user with correct email should return user object', async () => {
    expect(await controller.login(TestLoginDTO)).toEqual(TestLoginUserResponse);

    expect(mockAuthService.login).toHaveBeenCalledWith(TestLoginDTO);
  });

  it('login fails for unknown user', async () => {
    expect(await controller.login(TestFailingLoginDTO)).toEqual(NotFoundErr);
  });

  it('login fails for unknown user', async () => {
    expect(await controller.register(TestFailingRegisterDTO)).toEqual(
      BadReqError,
    );
  });
});
