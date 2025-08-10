// src/services/mathService.js

/**
 * Calculates the distance between two objects with x, y, z coordinates.
 * @param {{x: number, y: number, z: number}} posA
 * @param {{x: number, y: number, z: number}} posB
 * @returns {string} Distance in kilometers (formatted to 2 decimal places).
 */
export function distanceBetweenObjects(posA, posB) {
  const distance = Math.sqrt(
    Math.pow(posB.x - posA.x, 2) +
    Math.pow(posB.y - posA.y, 2) +
    Math.pow(posB.z - posA.z, 2)
  );
  return `${Number(distance.toFixed(2))}km`;
}