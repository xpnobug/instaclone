import { formatDistanceStrict, format } from 'date-fns';
import { zhCN, enUS } from "date-fns/locale";
export const formatDateDistance = (endDate) => {
  const format = formatDistanceStrict(new Date(), new Date(endDate),{ locale: zhCN });
  const duration = format.split(' ');
  // duration[1] = duration[1].substring(0, 1);
  if (duration[1] === 's') {
    return '刚刚';
  }
  return duration.join(' ');
};

export const formatDate = (date) => {
  date = new Date(date);
  const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss',{ locale: zhCN });
  return formattedDate;
};
