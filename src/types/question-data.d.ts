type QuestionContentVariant = 'card' | 'page';

interface QuestionData {
  id: string;
  questionText: string;
  author: string;
  datetime: string;
  variant: QuestionContentVariant;
}
