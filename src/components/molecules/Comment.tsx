import * as React from 'react';

import Grid from '@mui/material/Grid';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import AuthorDateDivider from '../atoms/AuthorDateDivider';
import CommentText from '../atoms/CommentText';
import { CommentData } from '../../app/_redux/reducers/commentReducer/types';
import { localizeDate } from '../../services/localization';

const config = {
  authorDateDivider: {
    cardDivider: ' at ',
    pageDivider: ' - '
  }
};

const Comment = ({
  id,
  text,
  authorId,
  authorUsername,
  postId,
  datetime
}: CommentData): React.ReactElement => {
  return (
    <Grid container gap={1}>
      <Grid item>
        <UserAvatar username={authorUsername} size="normal" />
      </Grid>
      <Grid item>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <Author author={authorUsername} variant="page" />
            <AuthorDateDivider variant="page" {...config.authorDateDivider} />
            <MetaDate date={localizeDate(datetime)} variant="normal" />
          </Grid>
          <Grid item>
            <CommentText text={text} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Comment;
