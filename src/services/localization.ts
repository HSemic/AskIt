export const localizeDate = (date: number): string => {
  return new Date(date).toLocaleDateString(navigator.language);
};
