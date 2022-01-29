import * as React from 'react';

import Grid from '@mui/material/Grid';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import AuthorDateDivider from '../atoms/AuthorDateDivider';
import CommentText from '../atoms/CommentText';

const config = {
  authorDateDivider: {
    cardDivider: ' at ',
    pageDivider: ' - '
  }
};

const Comment = ({
  author,
  datetime,
  commentText
}: CommentData): React.ReactElement => {
  return (
    <Grid container gap={1}>
      <Grid item>
        <UserAvatar username={author} size="normal" />
      </Grid>
      <Grid item>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <Author author={author} variant="page" />
            <AuthorDateDivider variant="page" {...config.authorDateDivider} />
            <MetaDate date={datetime} variant="normal" />
          </Grid>
          <Grid item>
            <CommentText text={commentText} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Comment;
