import * as bcrypt from 'bcrypt';
import { PASSWORD_HASHING_SALT_OR_ROUNDS } from '../constants';

export const hashWord = async (value: string): Promise<string> => {
  const hash = await bcrypt.hash(value, PASSWORD_HASHING_SALT_OR_ROUNDS);

  return hash;
};

export const compareHash = async (
  value: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(value, hash);

  return isMatch;
};
