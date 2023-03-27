export const formatDate = (value: string): string => {
  if (!value) {
    return "";
  }
  const inputDate: Date = new Date(value);
  let date: number | string = inputDate.getDate();
  let month: number | string = inputDate.getMonth() + 1;
  const year: number = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  return `${date}/${month}/${year}`;
};

export const formatDuration = (value: number): string => {
  if (!value) {
    return "";
  }
  const date: Date = new Date(value);
  return date.toISOString().substring(11, 19);
};
