import type { StorageAdapter } from "@bubblan/localization";

/** Browser localStorage adapter for web. */
export const localStorageAdapter: StorageAdapter = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
};
