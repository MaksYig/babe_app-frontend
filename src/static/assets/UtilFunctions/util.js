import moment from 'moment';

export const calculateAge = (date) => {
  const newDate = moment(date).format('YYYY-MM-DD');
  const diff = moment().diff(newDate, 'milliseconds');
  const duration = moment.duration(diff);
  const age = Object.assign({}, ...duration._data);
  return age;
};
