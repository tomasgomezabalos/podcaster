export const formatDate = (value: string): string => {
  if (!value) {
    return '';
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
    return '';
  }
  const date: Date = new Date(value);
  return date.toISOString().substring(11, 19);
};

const getDate = () => new Date().getTime();

const SECONDS_IN_24_HOURS = 24 * 60 * 60 * 1000;

const moreThan24Hours = (date: number): boolean => {
  return (getDate() - date) > SECONDS_IN_24_HOURS;
}

export const setCache = (key: string, value: any): void => {
  localStorage.setItem(`podcaster-${key}-${getDate()}`, JSON.stringify(value));
}

export const getCache = (key: string): any => {
  for (let i: number = 0; i < localStorage.length; i++) {
    const storageKey: string | null = localStorage.key(i);
    if (storageKey && storageKey.startsWith(`podcaster-${key}-`)) {
      const date: number = +storageKey.split(`podcaster-${key}-`)[1];
      if (!moreThan24Hours(date)) {
        return localStorage.getItem(storageKey);
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }
  return null;
}
