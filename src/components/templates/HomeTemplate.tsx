import * as React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import QuestionList from '../organisms/QuestionList';
import SideListUsers from '../organisms/SideListUsers';
import SideListTopPosts from '../organisms/SideListTopPosts';

import AddQuestionForm from '../molecules/AddQuestionForm';
import LogInToMessage from '../atoms/LogInToMessage';

import { useAuth } from '../providers/AuthProvider';
import { UserApiData } from '../../app/_redux/reducers/userReducer/types';

const config = {
  topUsersListTitle: 'Top AskIt-ers',
  topPostsListTitle: 'Hot posts'
};

interface HomeProps {
  questions: QuestionData[];
  topUsers: UserApiData[];
  topPosts?: string[];
  page: number;
}

const HomeTemplate = ({
  questions,
  topUsers,
  topPosts,
  page
}: HomeProps): React.ReactElement => {
  const { loggedIn } = useAuth();

  return (
    <Container>
      <Grid container gap={2}>
        <Grid item md={7} xs={12}>
          <Grid container gap={2}>
            <Grid item xs={12}>
              {loggedIn ? (
                <AddQuestionForm />
              ) : (
                <LogInToMessage text="Log in to post questions" />
              )}
            </Grid>
            <Grid item xs={12}>
              <QuestionList
                questions={questions}
                variant="newest"
                page={page}
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
              {/* <SideListTopPosts
                title={config.topPostsListTitle}
                posts={topUsers}
              /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeTemplate;
