export const processUsername = (firstName: string, lastName: string) => {
  let username = firstName ? firstName : '';
  username = lastName ? username + ' ' + lastName : username + '';
  if (username.length === 0) username = 'Anonymous';

  return username;
};
