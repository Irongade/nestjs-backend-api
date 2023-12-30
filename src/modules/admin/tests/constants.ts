import { Role } from 'src/common/enums';

export const TestAdminUpdateUserPayload = {
  name: 'Test',
  email: 'test@gmail.com',
  role: Role.USER,
};

export const TestDeleteUserResponse = {
  success: true,
  message: 'User deleted successfully',
};

export const TestAdminUpdateUser = {
  success: true,
  message: 'User updated successfully',
};
