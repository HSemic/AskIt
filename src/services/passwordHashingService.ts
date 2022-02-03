import sha256 from 'crypto-js/sha256';

export const hashAPassword = (password: string): string => {
  console.log(sha256(password).toString());
  return sha256(password).toString();
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return sha256(password).toString() === hash;
};
