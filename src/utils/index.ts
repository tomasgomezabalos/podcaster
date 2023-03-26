export const formatDate = (value: string) => {
  const inputDate = new Date(value);
  let date, month, year;
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  return `${date}/${month}/${year}`;
}

export const formatDuration = (value: number) => {
  const date = new Date(value);
  return date.toISOString().substring(11, 19)
}
