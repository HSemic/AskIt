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
import { processUsername } from '../../services/username';

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
          const username = processUsername(user.firstName, user.lastName);
          return (
            <ListItem divider={index < users.length - 1} key={index}>
              <Grid item container gap={2} justifyContent="flex-start">
                <Grid item>
                  <ListItemText primary={`${index + 1}.`} />
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item flexGrow={0}>
                      <ListItemAvatar>
                        <UserAvatar
                          username={
                            username.length > 0 ? username : 'Anonymous'
                          }
                          size="normal"
                        />
                      </ListItemAvatar>
                    </Grid>
                    <Grid item flexGrow={1}>
                      <ListItemText
                        primary={username.length > 0 ? username : 'Anonymous'}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item flexGrow={1}>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <ListItemText
                        primary={
                          user.numberOfAnswers === 1
                            ? user.numberOfAnswers + 'comment'
                            : user.numberOfAnswers + ' comments'
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default SideListUsers;
