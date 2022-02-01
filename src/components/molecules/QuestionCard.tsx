import * as React from 'react';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import QuestionText from '../atoms/QuestionText';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import CommentCount from '../atoms/CommentCount';
import UserAvatar from '../atoms/UserAvatar';
import AuthorDateDivider from '../atoms/AuthorDateDivider';
import LikesDislikes from '../atoms/LikesDislikes';

import { useNavigate } from 'react-router-dom';

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
  },
  button: {
    height: '3rem'
  },
  buttonEdit: {
    marginLeft: '0.5rem !important'
  }
});

const config = {
  authorDateDivider: {
    cardDivider: ' at ',
    pageDivider: ' - '
  }
};

interface QuestionCardProps {
  question: QuestionData;
}

const QuestionCard = ({ question }: QuestionCardProps): React.ReactElement => {
  const classes = useStyles();

  const navigate = useNavigate();

  const onQuestionCardClick = () => {
    navigate(`question/${question.id}`);
  };

  const questionContent = (
    <Grid
      container
      gap={question.variant === 'card' ? 1 : 2}
      alignItems="center"
      justifyContent="flex-start"
      sx={{ overflowWrap: 'break-word' }}
    >
      <Grid item xs={10}>
        <Grid
          container
          direction="column"
          gap={question.variant === 'card' ? 1 : 2}
        >
          <Grid item>
            <Grid container alignItems="center" gap={1}>
              <Grid item>
                <UserAvatar
                  username={question.author}
                  size={question.variant === 'card' ? 'small' : 'normal'}
                />
              </Grid>
              <Grid item>
                <Author author={question.author} variant={question.variant} />
                <AuthorDateDivider
                  variant={question.variant}
                  {...config.authorDateDivider}
                />
                <MetaDate
                  date={question.datetime.toString()}
                  variant="normal"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <QuestionText
              text={question.questionText}
              variant={question.variant}
            />
          </Grid>
          <Grid item>
            <Grid container gap={2}>
              <Grid item>
                <CommentCount commentCount={question.commentNumber} />
              </Grid>
              {question.variant === 'card' ? (
                <>
                  <Grid item>
                    <LikesDislikes
                      variant="likes"
                      text={question.likes.toString()}
                    />
                  </Grid>
                  <Grid item>
                    <LikesDislikes
                      variant="dislikes"
                      text={question.dislikes.toString()}
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return question.variant === 'card' ? (
    <Card className={classes.questionCard} onClick={onQuestionCardClick}>
      <CardContent className={classes.questionCardContent}>
        {questionContent}
      </CardContent>
    </Card>
  ) : (
    questionContent
  );
};

export default QuestionCard;
