import * as React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import QuestionList from '../organisms/QuestionList';
import SideListUsers from '../organisms/SideListUsers';
import SideListTopPosts from '../organisms/SideListTopPosts';

import AddQuestionForm from '../molecules/AddQuestionForm';

const config = {
  topUsersListTitle: 'Top AskIt-ers',
  topPostsListTitle: 'Hot posts'
};

interface HomeProps {
  questions: QuestionData[];
  topUsers: string[];
  topPosts?: string[];
}

const HomeTemplate = ({
  questions,
  topUsers,
  topPosts
}: HomeProps): React.ReactElement => {
  return (
    <Container>
      <Grid container gap={2}>
        <Grid item md={7} xs={12}>
          <Grid container gap={4}>
            <Grid item xs={12}>
              <AddQuestionForm />
            </Grid>
            <Grid item xs={12}>
              <QuestionList questions={questions} />
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
                posts={topUsers}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeTemplate;
