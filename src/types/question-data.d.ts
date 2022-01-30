type QuestionContentVariant = 'card' | 'page';

interface QuestionData {
  id: string;
  questionText: string;
  author: string;
  authorId: string;
  datetime: string;
  likes: number;
  dislikes: number;
  variant: QuestionContentVariant;
}
