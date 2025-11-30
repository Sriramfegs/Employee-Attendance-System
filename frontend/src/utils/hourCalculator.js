export const calculateHours = (checkIn, checkOut) => {
  const start = new Date(`2000-01-01T${checkIn}`);
  const end = new Date(`2000-01-01T${checkOut}`);
  const diff = (end - start) / 3600000;
  return diff.toFixed(2);
};
