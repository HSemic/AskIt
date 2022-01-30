export const localizeDate = (dateNumber: number): string => {
  const date = new Date(dateNumber);
  return (
    date.toLocaleDateString(navigator.language) +
    ' - ' +
    date.toLocaleTimeString(navigator.language)
  );
};
