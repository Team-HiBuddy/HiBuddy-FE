export function getTimeDiff(date: Date) {
  const timeDiff = Date.now() - date.getTime();

  const secondsDiff = timeDiff / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;
  const daysDiff = hoursDiff / 24;

  if (daysDiff >= 1) return Math.floor(daysDiff) + "d ago";
  if (hoursDiff >= 1) return Math.floor(hoursDiff) + "h ago";

  return Math.floor(minutesDiff) + "m ago";
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
