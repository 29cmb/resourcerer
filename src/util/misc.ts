function formatTime(date: Date) {
  const pad = (num: number, padLength?: number) => num.toString().padStart(padLength || 2, '0');
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  const ms = pad(date.getMilliseconds(), 3);
  return `${h}:${m}:${s}.${ms}`;
}

export default {
  formatTime
}