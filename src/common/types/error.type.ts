import { HttpStatus } from '@nestjs/common';

export type ResponseData<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ErrorData = {
  success: boolean;
  message: string;
  code?: HttpStatus;
};
