export function getFormattedDate(date: any) {
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date: any, days: any) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  // Get year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Create the formatted date string in "yyyy-mm-dd" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
