type QuestionContentVariant = 'card' | 'page';

interface QuestionData {
  questionText: string;
  author: string;
  datetime: string;
  variant: QuestionContentVariant;
}
