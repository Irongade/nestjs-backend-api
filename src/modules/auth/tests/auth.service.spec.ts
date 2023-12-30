import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { TestUserDTO } from 'src/modules/user/tests/constants';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';

import { TestRegisterDTO, TestRegisterUserResponse } from './constants';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: AuthService;

  const mockAuthRepository = {
    exist: jest.fn().mockImplementation((data) => {
      if (data && data.where.email !== 'doesNotExist') {
        return false;
      } else {
        throw new ForbiddenException('User with this email already exists');
      }
    }),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        role: user.role,
        name: user.name,
        email: user.email,
        id: '605e4433-458e-4583-9c45-d7d32192d3dd',
        password:
          '$2b$10$7QdbG984/1q2DO6ZmWv.kes/kYsG71SpzM1AcFnXfY8OLaF8Fn1tq',
        createdAt: '2023-12-30T16:42:31.000Z',
        updatedAt: null,
      }),
    ),
    findOne: jest.fn((criteria) => {
      if (criteria && criteria.where.email !== 'unauthenticated') {
        return TestUserDTO;
      } else {
        throw new NotFoundException('User not found');
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockAuthRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetch user service works', async () => {
    expect(await service.register(TestRegisterDTO)).toEqual(
      TestRegisterUserResponse,
    );
  });

  it('geting user with incorrect email should throw error', async () => {
    await expect(
      service.register({ ...TestRegisterDTO, email: 'doesNotExist' }),
    ).rejects.toEqual(
      new ForbiddenException('User with this email already exists'),
    );
  });
});
