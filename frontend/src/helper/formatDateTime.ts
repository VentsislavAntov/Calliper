export const formatDateTime = (dateString: string): string => {
  const inputDate = new Date(dateString);

  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const year = inputDate.getFullYear();

  const hour = String(inputDate.getHours()).padStart(2, '0');
  const minute = String(inputDate.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hour}-${minute}`;
};
