import * as bcrypt from 'bcrypt';

export const hashWord = async (value: string): Promise<string> => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(value, saltOrRounds);

  return hash;
};

export const compareHash = async (value: string, hash): Promise<boolean> => {
  const isMatch = await bcrypt.compare(value, hash);

  return isMatch;
};
