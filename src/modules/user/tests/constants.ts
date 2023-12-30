import { Role } from 'src/common/enums';

export const authenticatedUser = {
  id: '54d0406f-25a4-4557-8b69-e8f138b9a24a',
  name: 'Test',
  email: 'test@gmail.com',
  role: Role.USER,
};

export const unauthenticatedUser = {
  id: '54d0406f-25a4-4557-8b69-e8f138b9a24a',
  name: 'Test',
  email: 'wrongtest@gmail.com',
  role: 'USER',
};

export const TestUserDTO = {
  id: '54d0406f-25a4-4557-8b69-e8f138b9a24a',
  name: 'Test',
  email: 'test@gmail.com',
  role: 'USER',
  createdAt: '2023-12-30T14:15:18.000Z',
  updatedAt: null,
};

export const TestUpdatedUserDTO = {
  id: '54d0406f-25a4-4557-8b69-e8f138b9a24a',
  name: 'New Name',
  email: 'test@gmail.com',
  role: 'USER',
  createdAt: '2023-12-30T14:15:18.000Z',
  updatedAt: null,
};

export const usersResponse = {
  success: true,
  message: 'Users fetched successfully',
  data: [TestUserDTO],
};

export const userResponse = {
  success: true,
  message: 'User fetched successfully',
  data: TestUserDTO,
};

export const updatedUserId = '54d0406f-25a4-4557-8b69-e8f138b9a24a';
export const updatedUserPayload = {
  name: 'New Name',
};

export const updatedUserResponse = {
  success: true,
  message: 'Users fetched successfully',
  data: TestUpdatedUserDTO,
};

export const BadReqError = {
  message: 'Something bad happened',
  error: 'Some error description',
  statusCode: 400,
};

export const NotFoundErr = {
  message: 'User not found',
  error: 'Some error description',
  statusCode: 404,
};
