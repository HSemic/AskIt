import * as React from 'react';
import { useEffect, useState } from 'react';

import ProfileTemplate from '../components/templates/ProfileTemplate';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/_redux/reducers/rootReducer';
import {
  clearQuestions,
  fetchQuestionListRequest
} from '../app/_redux/actions/questionActions';

const ProfilePage = (): React.ReactElement => {
  const { loggedInUser } = useSelector((state: RootState) => state.user);

  const { questionList } = useSelector((state: RootState) => state.question);

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!questionList || questionList.length === 0)
    if (loggedInUser) dispatch(fetchQuestionListRequest(1, loggedInUser.id));

    return function cleanup() {
      dispatch(clearQuestions());
    };
  }, []);

  if (!loggedInUser) return <></>;

  return (
    <ProfileTemplate
      userData={loggedInUser}
      questions={questionList}
      page={page}
    />
  );
};

export default ProfilePage;
