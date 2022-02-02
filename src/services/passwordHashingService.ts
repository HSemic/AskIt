import { createHash } from 'crypto';

export const hashAPassword = (password: string): string => {
  return createHash('sha256').update(password).digest('hex');
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return createHash('sha256').update(password).digest('hex') === hash;
};
