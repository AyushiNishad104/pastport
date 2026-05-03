import { monuments } from "../data/monuments";

export function simulateRecognition(filename: string): typeof monuments[0] {
  // Simple hash-based simulation for consistent results
  const hash = filename.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % monuments.length;
  
  return monuments[index];
}

export function getMonumentById(id: string) {
  return monuments.find(m => m.id === id);
}

export function getMonumentsByCity(city: string) {
  return monuments.filter(m => m.city === city);
}

export function getRandomMonument() {
  const index = Math.floor(Math.random() * monuments.length);
  return monuments[index];
}