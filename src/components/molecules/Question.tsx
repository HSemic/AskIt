import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { ThumbUp, ThumbDown } from '@mui/icons-material';

import QuestionText from '../atoms/QuestionText';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import CommentCount from '../atoms/CommentCount';
import UserAvatar from '../atoms/UserAvatar';
import ButtonGroup from './ButtonGroup';
import IconButton from '../atoms/IconButton';
import Button from '@mui/material/Button';
import AuthorDateDivider from '../atoms/AuthorDateDivider';
import LikesDislikes from '../atoms/LikesDislikes';

import { useNavigate } from 'react-router-dom';

import { RootState } from '../../app/_redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  questionCard: {
    padding: '1.5rem 2rem',
    boxShadow: 'none !important',
    border: '1px solid lightgrey',
    minHeight: '12rem',
    '&:hover': {
      border: '1px solid black',
      cursor: 'pointer'
    }
  },
  questionCardContent: {
    padding: '0 !important'
  }
});

const config = {
  authorDateDivider: {
    cardDivider: ' at ',
    pageDivider: ' - '
  }
};

const Question = ({
  questionText,
  author,
  datetime,
  variant,
  id,
  authorId,
  likes,
  dislikes
}: QuestionData): React.ReactElement => {
  const classes = useStyles();

  console.log(id + ' ' + author);

  const navigate = useNavigate();

  const onQuestionCardClick = () => {
    navigate(`question/${id}`);
  };

  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const questionContent = (
    <Grid
      container
      gap={variant === 'card' ? 1 : 2}
      alignItems="center"
      justifyContent="flex-start"
      sx={{ overflowWrap: 'break-word' }}
    >
      {variant === 'page' && (
        <Grid item xs={1}>
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
      )}
      <Grid item xs={10}>
        <Grid container direction="column" gap={variant === 'card' ? 1 : 2}>
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
                <AuthorDateDivider
                  variant={variant}
                  {...config.authorDateDivider}
                />
                <MetaDate date={datetime.toString()} variant="normal" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QuestionText text={questionText} variant={variant} />
          </Grid>
          <Grid item>
            <Grid container gap={2}>
              <Grid item>
                <CommentCount commentCount={1} />
              </Grid>
              {variant === 'card' ? (
                <>
                  <Grid item>
                    <LikesDislikes variant="likes" text={likes.toString()} />
                  </Grid>
                  <Grid item>
                    <LikesDislikes
                      variant="dislikes"
                      text={dislikes.toString()}
                    />
                  </Grid>
                </>
              ) : null}
              {variant === 'page' &&
              loggedInUser !== undefined &&
              loggedInUser !== null &&
              loggedInUser.id === authorId ? (
                <>
                  <Grid
                    item
                    gap={1}
                    sx={{ marginLeft: 'auto', marginRight: '-2rem' }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ height: '3rem' }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ height: '3rem', marginLeft: '0.5rem' }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return variant === 'card' ? (
    <Card className={classes.questionCard} onClick={onQuestionCardClick}>
      <CardContent className={classes.questionCardContent}>
        {questionContent}
      </CardContent>
    </Card>
  ) : (
    questionContent
  );
};

export default Question;
