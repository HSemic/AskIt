import * as React from 'react';
import { makeStyles } from '@mui/styles';

import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  formTitle: {
    fontSize: '3rem !important'
  }
});

interface FormTitleProps {
  text: string;
}

const FormTitle = ({ text }: FormTitleProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Typography variant="h1" className={classes.formTitle}>
      {text}
    </Typography>
  );
};

export default FormTitle;
