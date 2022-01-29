import * as React from 'react';

import QuestionTemplate from '../components/templates/QuestionTemplate';

const config: { question: QuestionData; comments: CommentData[] } = {
  question: {
    questionText:
      'How is everyone doing today? This is one longer question to test the layout.',
    author: 'HSemic',
    datetime: '23.01.2022',
    variant: 'page'
  },
  comments: [
    {
      commentText: 'I am fine, thank you!',
      author: 'ESemic',
      datetime: '23.01.2022'
    },
    {
      commentText: 'I am fine, thank you!',
      author: 'ESemic',
      datetime: '23.01.2022'
    },
    {
      commentText: 'I am fine, thank you!',
      author: 'ESemic',
      datetime: '23.01.2022'
    },
    {
      commentText: 'I am fine, thank you!',
      author: 'ESemic',
      datetime: '23.01.2022'
    },
    {
      commentText: 'I am fine, thank you!',
      author: 'ESemic',
      datetime: '23.01.2022'
    },
    {
      commentText: 'I am fine, thank you!',
      author: 'ESemic',
      datetime: '23.01.2022'
    }
  ]
};

const QuestionPage = (): React.ReactElement => {
  return <QuestionTemplate {...config} />;
};

export default QuestionPage;
