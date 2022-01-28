import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  authorDate: {
    color: '#787C7E'
  }
});

interface QuestionAuthorDateProps {
  author: string;
  datetime: string;
}

const QuestionAuthorDate = ({
  author,
  datetime
}: QuestionAuthorDateProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Typography className={classes.authorDate}>
      Posted by {author} at {datetime}
    </Typography>
  );
};

export default QuestionAuthorDate;
