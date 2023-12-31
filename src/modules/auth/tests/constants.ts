import { Role } from 'src/common/enums';

export const TestRegisterDTO = {
  name: 'Third User',
  email: 'third@gmail.com',
  password: 'Text123',
  role: Role.USER,
  confirm_password: 'Text123',
};

export const TestFailingRegisterDTO = {
  name: 'Third User',
  email: 'exists',
  password: 'Text123',
  role: Role.USER,
  confirm_password: 'Text123',
};

export const TestLoginDTO = {
  email: 'admin@gmail.com',
  password: 'Text123',
};

export const TestFailingLoginDTO = {
  email: 'exists',
  password: 'Text123',
};

export const TestLoginUserResponse = {
  success: true,
  message: 'Login Successfull',
  data: {
    user: {
      id: 'cdd4a8c2-1760-47a5-9c27-4e71ae360dc4',
      name: 'Admin forever',
      email: 'admin@gmail.com',
      role: 'ADMIN',
    },
    access_token: 'token',
  },
};

export const TestRegisterUserResponse = {
  success: true,
  message: 'User successfully created',
  data: {
    id: '605e4433-458e-4583-9c45-d7d32192d3dd',
    name: 'Third User',
    email: 'third@gmail.com',
    password: '$2b$10$7QdbG984/1q2DO6ZmWv.kes/kYsG71SpzM1AcFnXfY8OLaF8Fn1tq',
    role: 'USER',
    updatedAt: null,
    createdAt: '2023-12-30T16:42:31.000Z',
  },
};
