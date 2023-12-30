import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../services/admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';

import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  TestUserDTO,
  authenticatedUser,
} from 'src/modules/user/tests/constants';
import { TestDeleteUserResponse } from './constants';

describe('AdminService', () => {
  let service: AdminService;

  const mockUserRepository = {
    findOne: jest.fn((criteria) => {
      console.log(criteria, TestUserDTO);
      if (criteria && criteria.where.id === 'does-not-exist') {
        console.log('try');
        return null;
      } else if (criteria && criteria.where.id === 'existing-id') {
        return TestUserDTO;
      } else {
        return {
          ...TestUserDTO,
          email: 'validemail@yahoo.com',
        };
      }

      console.log('end');
    }),
    delete: jest.fn((critetia) => {
      if (critetia.id == 'fail') {
        throw new InternalServerErrorException('Something went wrong');
      }
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetch delete users work when user exists and triggered by another user', async () => {
    expect(await service.deleteUser('valid-id', authenticatedUser)).toEqual(
      TestDeleteUserResponse,
    );
  });

  it('fetch delete users fails when user exists but triggered by same user', async () => {
    await expect(
      service.deleteUser('existing-id', authenticatedUser),
    ).rejects.toEqual(new ForbiddenException('User cannot delete themselves'));
  });

  it('fetch delete users fails when user does not exist', async () => {
    await expect(
      service.deleteUser('does-not-exist', authenticatedUser),
    ).rejects.toEqual(new NotFoundException('User not found.'));
  });
});
