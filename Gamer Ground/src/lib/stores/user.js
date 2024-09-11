import { writable } from 'svelte/store';

// Check if localStorage is available (only available in the browser)
const isBrowser = typeof window !== 'undefined';

// Initialize store with value from localStorage if available
export const user = writable(isBrowser ? localStorage.getItem('userName') || '' : '');

// Sync store with localStorage
user.subscribe((value) => {
  if (isBrowser) {
    if (value) {
      localStorage.setItem('userName', value); // Save userName to localStorage
    } else {
      localStorage.removeItem('userName'); // Remove userName when logged out
    }
  }
});
