import * as React from 'react';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import SideListTitle from '../atoms/SideListTitle';

interface SideListTopPostsProps {
  title: string;
  posts: string[];
}

const SideListTopPosts = ({
  title,
  posts
}: SideListTopPostsProps): React.ReactElement => {
  return (
    <Paper>
      <SideListTitle text={title} />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {posts.map((post, index) => {
          return (
            <ListItem divider={index < posts.length - 1}>
              <ListItemText primary={`${index + 1}.`} sx={{ flex: '0.2' }} />
              <ListItemText primary={post} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default SideListTopPosts;
