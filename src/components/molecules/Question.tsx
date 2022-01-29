import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { ThumbUp, ThumbDown } from '@mui/icons-material';

import QuestionText from '../atoms/QuestionText';
import Author from '../atoms/Author';
import Date from '../atoms/Date';
import QuestionCommentCount from '../atoms/QuestionCommentCount';
import UserAvatar from '../atoms/UserAvatar';
import ButtonGroup from './ButtonGroup';
import IconButton from '../atoms/IconButton';
import AuthorDateDivider from '../atoms/AuthorDateDivider';

const useStyles = makeStyles({
  questionCard: {
    padding: '1.5rem 1rem',
    boxShadow: 'none !important',
    border: '1px solid lightgrey',
    '&:hover': {
      border: '1px solid black',
      cursor: 'pointer'
    }
  },
  questionCardContent: {
    padding: '0 !important'
  }
});

const Question = ({
  questionText,
  author,
  datetime,
  variant
}: QuestionData): React.ReactElement => {
  const classes = useStyles();

  const questionContent = (
    <Grid container gap={1} alignItems="center">
      <Grid item>
        <ButtonGroup direction="column" gap={0}>
          <>
            <IconButton>
              <ThumbUp />
            </IconButton>
            <IconButton>
              <ThumbDown />
            </IconButton>
          </>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <Grid container alignItems="center" gap={1}>
              <Grid item>
                <UserAvatar
                  username={author}
                  size={variant === 'card' ? 'small' : 'normal'}
                />
              </Grid>
              <Grid item>
                <Author author={author} variant={variant} />
                <AuthorDateDivider variant={variant} />
                <Date date={datetime} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QuestionText text={questionText} variant={variant} />
          </Grid>
          <Grid item>
            <QuestionCommentCount commentCount={1} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return variant === 'card' ? (
    <Card className={classes.questionCard}>
      <CardContent className={classes.questionCardContent}>
        {questionContent}
      </CardContent>
    </Card>
  ) : (
    questionContent
  );
};

export default Question;
