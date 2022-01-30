type QuestionContentVariant = 'card' | 'page';

interface QuestionData {
  id: string;
  questionText: string;
  author: string;
  datetime: number;
  variant: QuestionContentVariant;
}
