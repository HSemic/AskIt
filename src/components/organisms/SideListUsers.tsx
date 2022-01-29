import * as React from 'react';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import UserAvatar from '../atoms/UserAvatar';
import SideListTitle from '../atoms/SideListTitle';

interface SideListUsersProps {
  title: string;
  users: string[];
}

const SideListUsers = ({
  title,
  users
}: SideListUsersProps): React.ReactElement => {
  return (
    <Paper>
      <SideListTitle text={title} />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {users.map((username, index) => {
          return (
            <ListItem divider={index < users.length - 1}>
              <ListItemText primary={`${index + 1}.`} sx={{ flex: '0.2' }} />
              <ListItemAvatar>
                <UserAvatar username={username} size="normal" />
              </ListItemAvatar>
              <ListItemText primary={username} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default SideListUsers;
