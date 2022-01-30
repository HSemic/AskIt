const bcrypt = require('bcrypt');

export const hashAPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
