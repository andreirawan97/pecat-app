function parseMonth(monthNumber: number) {
  const MONTH = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return MONTH[monthNumber];
}

export function convertToDate(unixTimestamp: number) {
  let timestamp = new Date(unixTimestamp * 1000);
  let day = timestamp.getDay();
  let month = parseMonth(timestamp.getMonth());
  let year = timestamp.getFullYear();
  let hour = timestamp.getHours();
  let minute = '0' + timestamp.getMinutes();
  let second = '0' + timestamp.getSeconds();

  return `${day} ${month} ${year} ${hour}:${minute}:${second}`;
}
