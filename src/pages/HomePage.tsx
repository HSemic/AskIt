import * as React from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionListRequest } from '../app/_redux/actions/questionActions';
import { RootState } from '../app/_redux/reducers/rootReducer';

import HomeTemplate from '../components/templates/HomeTemplate';

const config: { topUsers: string[] } = {
  // questions: [
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   },
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   },
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   },
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   },
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   },
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   },
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   },
  //   {
  //     questionText: 'How are you?',
  //     author: 'Haris',
  //     datetime: '03.11.1991',
  //     variant: 'card'
  //   }
  // ],
  topUsers: ['Haris1', 'Haris2', 'Haris3', 'Haris4', 'Haris5']
};

const HomePage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const {
    pending: pendingQuestions,
    questionList,
    error: errorQuestions
  } = useSelector((state: RootState) => state.question);

  const { pending, loggedInUser, userList, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchQuestionListRequest());
  }, []);

  return <HomeTemplate questions={questionList} topUsers={config.topUsers} />;
};

export default HomePage;
