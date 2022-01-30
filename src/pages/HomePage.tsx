import * as React from 'react';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionListRequest } from '../app/_redux/actions/questionActions';
import { fetchTopUsersRequest } from '../app/_redux/actions/userActions';
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

  const [page, setPage] = useState(1);

  const { questionList } = useSelector((state: RootState) => state.question);

  const { topUsers } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!questionList || questionList.length === 0)
      dispatch(fetchQuestionListRequest(1, 'newest'));

    if (!topUsers || topUsers.length === 0) dispatch(fetchTopUsersRequest());
  }, [topUsers]);

  console.log(topUsers);

  return (
    <HomeTemplate questions={questionList} topUsers={topUsers} page={page} />
  );
};

export default HomePage;
