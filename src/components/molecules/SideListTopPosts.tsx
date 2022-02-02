import * as React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import SideListTitle from '../atoms/SideListTitle';

import { Link } from 'react-router-dom';

interface SideListTopPostsProps {
  title: string;
  questions: QuestionData[];
}

const SideListTopPosts = ({
  title,
  questions
}: SideListTopPostsProps): React.ReactElement => {
  return (
    <Paper>
      <SideListTitle text={title} />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {questions.map((question, index) => {
          return (
            <ListItem divider={index < questions.length - 1} key={index}>
              <Grid
                item
                container
                gap={2}
                justifyContent="flex-start"
                direction="row"
              >
                <Grid item>
                  <ListItemText primary={`${index + 1}.`} />
                </Grid>
                <Grid item>
                  <Link
                    to={`question/${question.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText primary={question.questionText} />
                  </Link>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default SideListTopPosts;
