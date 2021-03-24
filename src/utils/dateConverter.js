export default function timeConverter(UNIX_timestamp, lang, compact) {
  const time = new Date(UNIX_timestamp);
  let monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let monthsRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  let monthsUa = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
  let monthsNumeric = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  let year = time.getFullYear();
  let month;
  let date = time.getDate();
  let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  let min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  let sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

  // console.log(compact);
  if (lang === 'en') {
    if (compact) {
      month = monthsNumeric[time.getMonth()];
      return date + '/' + month + '/' + year;
    } else {
      month = monthsEn[time.getMonth()];
      return ' on ' + date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min + ':' + sec;
    }
  } else if (lang === 'ru') {
    if (compact) {
      month = monthsNumeric[time.getMonth()];
      return date + '/' + month + '/' + year;
    } else {
      month = monthsRu[time.getMonth()];
      return date + ' ' + month + ' ' + year + ' года в ' + hour + ':' + min + ':' + sec;
    }
  } else if (lang === 'ua') {
    if (compact) {
      month = monthsNumeric[time.getMonth()];
      return date + '/' + month + '/' + year;
    } else {
      month = monthsUa[time.getMonth()];
      return date + ' ' + month + ' ' + year + ' року о ' + hour + ':' + min + ':' + sec;
    }
  }
}

// console.log(timeConverter(5435435434354, 'en'));