/*
  Offline Cache System
  Stores last working navigation data so the app
  can continue functioning even without internet.
*/

const CACHE_KEY = "smartCommuteOfflineCache";

export function saveOfflineCache(data) {
  const cache = {
    route: data.route || [],
    hazards: data.hazards || [],
    safetyScore: data.safetyScore || 0,
    navSteps: data.navSteps || [],
    destination: data.destination || null,
    timestamp: Date.now(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

export function loadOfflineCache() {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearOfflineCache() {
  localStorage.removeItem(CACHE_KEY);
}
