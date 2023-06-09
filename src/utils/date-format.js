export default function dateFormat(time) {
  const date = new Date(time);
  const months = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня', 'июля',
    'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = (date.getHours().toString().length < 2) ? '0' + date.getHours() : date.getHours();
  const minutes = (date.getMinutes().toString().length < 2) ? '0' + date.getMinutes() : date.getMinutes();

  return `${day} ${month} ${year} в ${hours}:${minutes}`;
}
