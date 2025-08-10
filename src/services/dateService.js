// src/services/dateService.js
export function parseDateInput(input) {
  const dateObject = new Date(input);
  return {
    fullDate: input,
    day: String(dateObject.getDate()).padStart(2, '0'),
    month: String(dateObject.getMonth() + 1).padStart(2, '0'),
    year: dateObject.getFullYear(),
  };
}