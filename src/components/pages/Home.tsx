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
  ]
};

const Home = () => {
  return <HomeTemplate questions={config.questions} />;
};

export default Home;
