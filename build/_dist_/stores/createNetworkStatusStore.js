import { readable } from '../../web_modules/svelte/store.js';

/**
 * returns a subscribe method to a readable store, which keeps track
 * of the network status in an object, with an isOnline property and
 * a boolean value;
 *
 * 1. { isOnline: true } - online
 * 2. { isOnline: false } - offline
 *
 * event listeners for 'online' and 'offline' events are added to the
 * window and both have a callback function which sets the value of the
 * readable store to the value of the navigator.online property.
 *
 * @returns {Function} subscribe - subscribes to a store
 */
export default function createNetworkStatusStore() {
  /**
   * create a readable store that sets isOnline property to the value of
   * the navigator.online property (true || false) whenever the 'online'
   * and 'offline' events occur.
   */
  const { subscribe } = readable({ isOnline: navigator.onLine }, (set) => {
    window.addEventListener('online', () => set({ isOnline: navigator.onLine }));
    window.addEventListener('offline', () => set({ isOnline: navigator.onLine }));
  });
  // return subscribe method to the readable store
  return { subscribe };
}
