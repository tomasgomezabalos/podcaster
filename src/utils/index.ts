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

const getDate = () => new Date().toJSON().slice(0, 10).replace(/-/g, '/');

export const setCache = (key: string, value: any): void => {
  localStorage.setItem(`${getDate()}-${key}-podcaster`, JSON.stringify(value));
}

export const getCache = (key: string): any => {
  const data = localStorage.getItem(`${getDate()}-${key}-podcaster`);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

export const removeOldCache = (): void => {
  for (let i: number = 0; i < localStorage.length; i++) {
    const key: string | null = localStorage.key(i);
    if (key) {
      const keys = key.split('-');
      if (keys && keys.length > 1 && keys[keys.length - 1] === "podcaster" && keys[0] !== getDate()) {
        localStorage.removeItem(key);
      }
    }
  }
}
