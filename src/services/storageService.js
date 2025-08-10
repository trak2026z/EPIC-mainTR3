// src/services/storageService.js

export function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

export function loadData() {
  const raw = localStorage.getItem("data");
  return raw ? JSON.parse(raw) : null;
}

export function saveCurrentDisplayedDate(date) {
  localStorage.setItem("currentDisplayedDate", JSON.stringify(date));
}

export function loadCurrentDisplayedDate() {
  const raw = localStorage.getItem("currentDisplayedDate");
  return raw ? JSON.parse(raw) : null;
}
