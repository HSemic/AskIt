import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${
      name.split(' ')[1] ? name.split(' ')[1][0] : ''
    }`
  };
}

const config = {
  avatarSizes: {
    small: '26px',
    medium: '32px',
    large: '64px'
  }
};

interface UserAvatarProps {
  username: string;
  size: 'small' | 'normal' | 'large';
}

const UserAvatar = ({
  username,
  size
}: UserAvatarProps): React.ReactElement => {
  const dimension =
    size === 'normal'
      ? config.avatarSizes.medium
      : size === 'small'
      ? config.avatarSizes.small
      : config.avatarSizes.large;

  return (
    <Avatar
      {...stringAvatar(username)}
      sx={{
        width: dimension,
        height: dimension,
        margin: '0'
      }}
    />
  );
};

export default UserAvatar;
