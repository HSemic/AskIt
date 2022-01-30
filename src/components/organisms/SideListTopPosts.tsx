import * as React from 'react';

import Paper from '@mui/material/Paper';
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
            <ListItem divider={index < questions.length - 1}>
              <ListItemText primary={`${index + 1}.`} sx={{ flex: '0.2' }} />
              <Link
                to={`question/${question.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemText primary={question.questionText} />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default SideListTopPosts;
