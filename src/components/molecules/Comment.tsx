import * as React from 'react';
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import UserAvatar from '../atoms/UserAvatar';
import Author from '../atoms/MetaAuthor';
import MetaDate from '../atoms/MetaDate';
import AuthorDateDivider from '../atoms/AuthorDateDivider';
import CommentText from '../atoms/CommentText';
import { CommentData } from '../../app/_redux/reducers/commentReducer/types';
import { localizeDate } from '../../services/localization';

import { RootState } from '../../app/_redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

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
  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const [openEditForm, setOpenEditForm] = useState(false);

  return (
    <Grid container gap={1} sx={{ paddingRight: '2rem' }}>
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
      {loggedInUser !== undefined &&
      loggedInUser !== null &&
      loggedInUser.id === authorId ? (
        <>
          <Grid item gap={1} sx={{ marginLeft: 'auto', marginRight: '-2rem' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ height: '3rem' }}
              onClick={() => setOpenEditForm(true)}
            >
              Edit
            </Button>

            <Button
              variant="outlined"
              color="error"
              sx={{ height: '3rem', marginLeft: '0.5rem' }}
              // disabled={pending}
              // onClick={onButtonDeleteClick}
            >
              Delete
            </Button>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default Comment;
