import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const enumConcept = {
  INGRESO: 0,
  RETIRADA: 1,
};

export const formatNumber = (num: number) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    minimumFractionDigits: 2,
    useGrouping: true,
    currency: 'EUR',
  });
  return formatter.format(num);
};

export const randomOrder = () => {
  const randomNumber = Math.random().toString().slice(2, 11);
  return randomNumber;
};

export const formatFullDate = (dateString: Date | string) => {
  if (!dateString) return '-';
  const date = dayjs(dateString);
  return date.format('YYYY/MM/DD HH:mm:ss');
};
