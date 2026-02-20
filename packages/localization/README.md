# @bubblan/localization

Shared localization module with React Context and storage abstraction. Use `localStorage` for web and `AsyncStorage` for React Native.

## Usage (web)

```tsx
import { createLocalizationContext } from "@bubblan/localization";
import { translations } from "./translations";

const localStorageAdapter = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
};

const { Provider, useLocalization } = createLocalizationContext<typeof translations.is>();

<Provider
  storage={localStorageAdapter}
  translations={translations}
  defaultLocale="is"
  storageKey="app:locale"
>
  <App />
</Provider>
```

## Usage (React Native / bubblan/app)

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createLocalizationContext } from "@bubblan/localization";
import { translations } from "./translations";

const asyncStorageAdapter = {
  getItem: (key) => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
};

const { Provider, useLocalization } = createLocalizationContext<typeof translations.is>();

<Provider
  storage={asyncStorageAdapter}
  translations={translations}
  defaultLocale="is"
  storageKey="app:locale"
>
  <App />
</Provider>
```

## StorageAdapter interface

```ts
interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}
```
