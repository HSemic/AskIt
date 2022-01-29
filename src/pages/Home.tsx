import * as React from 'react';

import HomeTemplate from '../components/templates/HomeTemplate';

const config: { questions: QuestionData[]; topUsers: string[] } = {
  questions: [
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991',
      variant: 'card'
    }
  ],
  topUsers: ['Haris1', 'Haris2', 'Haris3', 'Haris4', 'Haris5']
};

const Home = (): React.ReactElement => {
  return (
    <HomeTemplate questions={config.questions} topUsers={config.topUsers} />
  );
};

export default Home;
