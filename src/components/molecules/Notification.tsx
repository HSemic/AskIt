import * as React from 'react';
import { makeStyles } from '@mui/styles';

import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import MetaText from '../atoms/MetaText';
import MetaAuthor from '../atoms/MetaAuthor';

import UserAvatar from '../atoms/UserAvatar';
import { blue } from '@mui/material/colors';

import { useDispatch } from 'react-redux';
import { editNotificationRequest } from '../../app/_redux/actions/notificationActions';

const useStyles = makeStyles({
  container: {
    display: 'block',
    width: '100%',
    maxWidth: '30rem',
    textDecoration: 'none',
    padding: '1rem 1.5rem',
    '&:hover': {
      backgroundColor: blue[200]
    }
  },
  containerNotRead: {
    backgroundColor: blue[100]
  }
});

interface NotificationProps {
  id: string;
  questionId: string;
  authorUsername: string;
  read: boolean;
  datetime: string;
}

const Notification = ({
  id,
  questionId,
  authorUsername,
  read,
  datetime
}: NotificationProps): React.ReactElement => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onNotificationClick = () => {
    dispatch(editNotificationRequest(id));
  };

  return (
    <Link
      className={`${classes.container} ${
        !read ? classes.containerNotRead : null
      }`}
      to={`/question/${questionId}`}
      onClick={onNotificationClick}
    >
      <Grid container direction="row" alignItems="center" gap={2}>
        <Grid item>
          <UserAvatar username={authorUsername} size="normal" />
        </Grid>
        <Grid item>
          <Grid container direction="column" gap={1}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <MetaAuthor author={authorUsername} variant="profile" />
                </Grid>
                <Grid item>
                  <MetaText text={'answered your question'} variant="normal" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <MetaText text={datetime} variant="normal" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};

export default Notification;
