import * as React from 'react';

import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import ProfileInfo from '../molecules/ProfileInfo';
import { UserApiData } from '../../app/_redux/reducers/userReducer/types';
import QuestionList from '../organisms/QuestionList';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  profilePaper: {
    padding: '2rem'
  }
});

interface ProfileTemplateProps {
  userData: UserApiData;
  questions: QuestionData[];
  page: number;
  incrementPage: () => void;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  passwordFirst: string;
  setPasswordFirst: React.Dispatch<React.SetStateAction<string>>;
  passwordSecond: string;
  setPasswordSecond: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  passwordFirstError: string;
  passwordSecondError: string;
  pending: boolean;
  apiError: string | null;
  onFirstNameEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onLastNameEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEmailEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onPasswordEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileTemplate = ({
  userData,
  questions,
  page,
  incrementPage,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  passwordFirst,
  setPasswordFirst,
  passwordSecond,
  setPasswordSecond,
  emailError,
  passwordFirstError,
  passwordSecondError,
  pending,
  apiError,
  onFirstNameEditSubmit,
  onLastNameEditSubmit,
  onEmailEditSubmit,
  onPasswordEditSubmit
}: ProfileTemplateProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid container direction="column" gap={4}>
        <Grid item>
          <Paper className={classes.profilePaper}>
            <ProfileInfo
              user={userData}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              passwordFirst={passwordFirst}
              setPasswordFirst={setPasswordFirst}
              passwordSecond={passwordSecond}
              setPasswordSecond={setPasswordSecond}
              emailError={emailError}
              passwordFirstError={passwordFirstError}
              passwordSecondError={passwordSecondError}
              pending={pending}
              apiError={apiError}
              onFirstNameEditSubmit={onFirstNameEditSubmit}
              onLastNameEditSubmit={onLastNameEditSubmit}
              onEmailEditSubmit={onEmailEditSubmit}
              onPasswordEditSubmit={onPasswordEditSubmit}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.profilePaper}>
            <QuestionList
              questions={questions}
              page={page}
              title="My questions"
              incrementPage={incrementPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileTemplate;
