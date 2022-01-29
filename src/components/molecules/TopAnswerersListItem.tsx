import * as React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import UserAvatar from '../atoms/UserAvatar';

interface TopAnswerersListItemProps {
  username: string;
}

const TopAnswerersListItem = ({
  username
}: TopAnswerersListItemProps): React.ReactElement => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <UserAvatar username={username} size="normal" />
      </Grid>
      <Grid item>
        <Typography>{username}</Typography>
      </Grid>
    </Grid>
  );
};

export default TopAnswerersListItem;
