import { writable } from '../../web_modules/svelte/store.js';

export default function createErrorStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    update,
    addError: (newError) => {
      // update store value with error
      update((storeValue) => {
        // if same error exists, return
        if (storeValue.some((error) => error.message === newError.message)) return storeValue;
        // else, update userErrors store (can't use Array.push())
        const array = [...storeValue, newError];
        // return updated error array
        return array;
      });
    },
    resetError: () => {
      set([]);
    },
  };
}
