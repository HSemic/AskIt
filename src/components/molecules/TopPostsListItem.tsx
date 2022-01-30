import * as React from 'react';

import Typography from '@mui/material/Typography';

interface TopPostsListItemProps {
  postTitle: string;
}

const TopPostsListItem = ({
  postTitle
}: TopPostsListItemProps): React.ReactElement => {
  return <Typography>{postTitle}</Typography>;
};

export default TopPostsListItem;
