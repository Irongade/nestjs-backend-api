import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import {
  TestUserDTO,
  TestUpdatedUserDTO,
  NotFoundErr,
  authenticatedUser,
  updatedUserId,
  updatedUserPayload,
  userResponse,
  usersResponse,
} from './constants';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    find: jest.fn(() => [TestUserDTO]),
    findOne: jest.fn((criteria) => {
      if (criteria && criteria.where.email !== 'unauthenticated') {
        return TestUserDTO;
      } else {
        throw new NotFoundException('User not found');
      }
    }),
    update: jest.fn((critetia, details) => {
      if (critetia && details) {
        return TestUpdatedUserDTO;
      } else {
        return NotFoundErr;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetch users work', async () => {
    expect(await service.fetchUsers()).toEqual(usersResponse);
  });

  it('fetch user with correct email should return user object', async () => {
    expect(await service.fetchUser(authenticatedUser.email)).toEqual(
      userResponse,
    );

    expect(mockUserRepository.findOne).toHaveBeenCalled();
  });

  it('geting user with incorrect email should throw error', async () => {
    await expect(service.fetchUser('unauthenticated')).rejects.toEqual(
      new NotFoundException('User not found'),
    );
  });

  it('update user by id successful', async () => {
    expect(
      await service.updateUserById(updatedUserId, updatedUserPayload),
    ).toEqual({ message: 'User updated successfully', success: true });
  });
});
