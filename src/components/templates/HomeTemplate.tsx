import * as React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import QuestionList from '../organisms/QuestionList';
import SideListUsers from '../molecules/SideListUsers';
import SideListTopPosts from '../molecules/SideListTopPosts';

import OneInputForm from '../molecules/OneInputForm';
import LogInToMessage from '../atoms/LogInToMessage';

import { UserApiData } from '../../app/_redux/reducers/userReducer/types';

const config = {
  topUsersListTitle: 'Top AskIt-ers',
  topPostsListTitle: 'Hot questions',
  addQuestionInputLabel: 'Question text'
};

interface HomeTemplateProps {
  questions: QuestionData[];
  topUsers: UserApiData[];
  topQuestions: QuestionData[];
  incrementPage: () => void;
  loggedIn: boolean;
  onAddQuestionFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  questionText: string;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  questionError: string;
  questionApiError: string | null;
  pendingAddQuestion: boolean;
  reload: () => void;
}

const HomeTemplate = ({
  questions,
  topUsers,
  topQuestions,
  incrementPage,
  loggedIn,
  onAddQuestionFormSubmit,
  questionText,
  setQuestionText,
  questionError,
  questionApiError,
  pendingAddQuestion,
  reload
}: HomeTemplateProps): React.ReactElement => {
  return (
    <Container
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        borderRadius: '2rem',
        padding: '3rem 0'
      }}
    >
      <Grid container gap={2} justifyContent="center">
        <Grid item md={7} xs={12}>
          <Grid container gap={6}>
            <Grid item xs={12}>
              {loggedIn ? (
                <OneInputForm
                  onSubmit={onAddQuestionFormSubmit}
                  inputText={questionText}
                  setInputText={setQuestionText}
                  errorMessage={questionError}
                  fetchErrorMessage={questionApiError}
                  pending={pendingAddQuestion}
                  inputLabel={config.addQuestionInputLabel}
                />
              ) : (
                <LogInToMessage text="Log in to post questions" />
              )}
            </Grid>
            <Grid item xs={12}>
              <QuestionList
                questions={questions}
                incrementPage={incrementPage}
                fallBackText="No questions have been asked yet"
                title="Most recent questions"
                reload={reload}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Grid container direction="column" gap={2}>
            <Grid item>
              <SideListUsers
                title={config.topUsersListTitle}
                users={topUsers}
              />
            </Grid>
            <Grid item>
              <SideListTopPosts
                title={config.topPostsListTitle}
                questions={topQuestions}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeTemplate;
