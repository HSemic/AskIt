import * as React from 'react';

import HomeTemplate from '../templates/HomeTemplate';

const config = {
  questions: [
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    },
    {
      questionText: 'How are you?',
      author: 'Haris',
      datetime: '03.11.1991'
    }
  ],
  topUsers: ['Haris1', 'Haris2', 'Haris3', 'Haris4', 'Haris5']
};

const Home = () => {
  return (
    <HomeTemplate questions={config.questions} topUsers={config.topUsers} />
  );
};

export default Home;
