const uuid = require('uuid');

export const generateRandomId = (): string => {
  return uuid.v4();
};
