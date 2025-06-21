import { format, isToday, isTomorrow, addYears, differenceInDays, parseISO } from 'date-fns';

export const formatBirthday = (birthday: string): string => {
  const date = parseISO(birthday);
  return format(date, 'MMMM d');
};

export const getAge = (birthday: string): number => {
  const birthDate = parseISO(birthday);
  const today = new Date();
  return today.getFullYear() - birthDate.getFullYear() - 
    (today.getMonth() < birthDate.getMonth() || 
     (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);
};

export const getNextBirthday = (birthday: string): Date => {
  const birthDate = parseISO(birthday);
  const today = new Date();
  const thisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  if (thisYear >= today) {
    return thisYear;
  } else {
    return addYears(thisYear, 1);
  }
};

export const getDaysUntilBirthday = (birthday: string): number => {
  const nextBirthday = getNextBirthday(birthday);
  const today = new Date();
  return differenceInDays(nextBirthday, today);
};

export const isBirthdayToday = (birthday: string): boolean => {
  return isToday(getNextBirthday(birthday));
};

export const isBirthdayTomorrow = (birthday: string): boolean => {
  return isTomorrow(getNextBirthday(birthday));
};

export const getBirthdayStatus = (birthday: string): string => {
  if (isBirthdayToday(birthday)) return 'Today!';
  if (isBirthdayTomorrow(birthday)) return 'Tomorrow';
  
  const days = getDaysUntilBirthday(birthday);
  if (days === 0) return 'Today!';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return `In ${days} days`;
  if (days <= 30) return `In ${days} days`;
  return `In ${Math.ceil(days / 30)} months`;
};