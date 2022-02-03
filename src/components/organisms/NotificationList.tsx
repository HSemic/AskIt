import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import NotificationIcon from '../atoms/NotificationIcon';
import Notification from '../molecules/Notification';
import LogInToMessage from '../atoms/LogInToMessage';

const useStyles = makeStyles({
  list: {
    padding: '0 !important'
  }
});

interface NotificationListProps {
  notificationList: {
    id: string;
    questionId: string;
    authorUsername: string;
    read: boolean;
    datetime: string;
  }[];
}

const NotificationList = ({ notificationList }: NotificationListProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <div>
      <NotificationIcon
        onClick={onButtonClick}
        notificationNumber={
          notificationList.filter((notification) => notification.read === false)
            .length
        }
      />
      <Menu
        classes={{ list: classes.list }}
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            maxWidth: '30rem'
          }
        }}
      >
        {notificationList.length === 0 && (
          <LogInToMessage height="10rem" text="No new notifications" />
        )}
        {notificationList.length > 0 &&
          notificationList.map((notification, index) => (
            <MenuItem
              key={index}
              onClick={onClose}
              sx={{
                padding: '0'
              }}
              disableGutters
            >
              <Notification {...notification} />
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default NotificationList;
