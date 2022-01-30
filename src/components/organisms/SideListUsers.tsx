import * as React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import UserAvatar from '../atoms/UserAvatar';
import SideListTitle from '../atoms/SideListTitle';
import { UserApiData } from '../../app/_redux/reducers/userReducer/types';

interface SideListUsersProps {
  title: string;
  users: UserApiData[];
}

const SideListUsers = ({
  title,
  users
}: SideListUsersProps): React.ReactElement => {
  return (
    <Paper>
      <SideListTitle text={title} />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {users.map((user, index) => {
          return (
            <ListItem divider={index < users.length - 1}>
              <Grid container gap={4}>
                <Grid item>
                  <ListItemText
                    primary={`${index + 1}.`}
                    sx={{ flex: '0.2' }}
                  />
                </Grid>
                <Grid item>
                  <ListItemAvatar>
                    <UserAvatar
                      username={user.firstName + ' ' + user.lastName}
                      size="normal"
                    />
                  </ListItemAvatar>
                </Grid>
                <ListItemText
                  primary={user.firstName + ' ' + user.lastName}
                  sx={{ marginLeft: '-40px' }}
                />
                <ListItemText
                  primary={user.comments + ' comments'}
                  sx={{ marginLeft: '-2px' }}
                />
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default SideListUsers;
