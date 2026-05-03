export interface UserProgress {
  points: number;
  badges: string[];
  visited: string[];
  quizzesCompleted: number;
}

const STORAGE_KEY = "pastport_user_progress";

const defaultProgress: UserProgress = {
  points: 0,
  badges: [],
  visited: [],
  quizzesCompleted: 0
};

export function loadUserProgress(): UserProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load user progress:", error);
  }
  
  return defaultProgress;
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save user progress:", error);
  }
}

export function resetUserProgress(): void {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to reset user progress:", error);
  }
}