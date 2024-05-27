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
