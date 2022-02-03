import * as React from 'react';
import { makeStyles } from '@mui/styles';

import { red } from '@mui/material/colors';
import IconButton from './IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const useStyles = makeStyles({
  numberDiv: {
    display: 'inline-block',
    padding: '.3rem 1rem',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: '50%',
    fontSize: '1.5rem !important',
    color: 'white',
    backgroundColor: red[300],
    zIndex: 10
  },
  divContainer: {
    display: 'inline-block',
    position: 'relative',
    marginRight: '1rem'
  },
  text: {
    display: 'inline-block',
    color: '#787C7E'
  }
});

interface NotificationIconProps {
  notificationNumber: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const NotificationIcon = ({
  notificationNumber,
  onClick
}: NotificationIconProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.divContainer}>
      {notificationNumber > 0 && (
        <div className={classes.numberDiv}>{notificationNumber}</div>
      )}
      <IconButton onClick={onClick}>
        <NotificationsNoneIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default NotificationIcon;
