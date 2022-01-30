import * as React from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { fetchQuestionDetailsRequest } from '../app/_redux/actions/questionActions';
import { RootState } from '../app/_redux/reducers/rootReducer';

import QuestionTemplate from '../components/templates/QuestionTemplate';

import { localizeDate } from '../services/localization';

// const config: { question: QuestionData; comments: CommentData[] } = {
//   question: {
//     questionText:
//       'How is everyone doing today? This is one longer question to test the layout.',
//     author: 'HSemic',
//     datetime: '23.01.2022',
//     variant: 'page'
//   },
//   comments: [
//     {
//       commentText: 'I am fine, thank you!',
//       author: 'ESemic',
//       datetime: '23.01.2022'
//     },
//     {
//       commentText: 'I am fine, thank you!',
//       author: 'ESemic',
//       datetime: '23.01.2022'
//     },
//     {
//       commentText: 'I am fine, thank you!',
//       author: 'ESemic',
//       datetime: '23.01.2022'
//     },
//     {
//       commentText: 'I am fine, thank you!',
//       author: 'ESemic',
//       datetime: '23.01.2022'
//     },
//     {
//       commentText: 'I am fine, thank you!',
//       author: 'ESemic',
//       datetime: '23.01.2022'
//     },
//     {
//       commentText: 'I am fine, thank you!',
//       author: 'ESemic',
//       datetime: '23.01.2022'
//     }
//   ]
// };

const QuestionPage = (): React.ReactElement => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { currentQuestion } = useSelector((state: RootState) => state.question);

  const { userList } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchQuestionDetailsRequest(id));
  }, []);

  console.log(id);

  return currentQuestion ? (
    <QuestionTemplate
      question={{
        id: currentQuestion.id,
        questionText: currentQuestion.title,
        author:
          userList[currentQuestion.authorId].firstName +
          ' ' +
          userList[currentQuestion.authorId].lastName,
        datetime: localizeDate(currentQuestion.datetime),
        likes: currentQuestion.likes,
        dislikes: currentQuestion.dislikes,
        variant: 'page'
      }}
    />
  ) : (
    <></>
  );
};

export default QuestionPage;
