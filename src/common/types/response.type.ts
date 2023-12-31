export type ResponseData<T> = {
  success: boolean;
  message: string;
  data: T | T[];
};

export type ResponseWithoutData = {
  success: boolean;
  message: string;
};
