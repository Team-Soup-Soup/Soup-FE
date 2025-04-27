import dayjs from 'dayjs';

export const getDate = (date: string, format: string) => {
  const target = dayjs(date);
  return target.format(format);
};

export const getPostDate = (date: Date) =>
  dayjs(date).format('YYYY-MM-DD HH:mm:ss');
